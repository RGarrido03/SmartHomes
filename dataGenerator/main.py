import json
import pika
import random
import os
import requests
import requests_cache
from pika import spec
from pika.adapters.blocking_connection import BlockingChannel

host = "rabbitmq"
port = 5672
username = "rabbitmq"
password = os.environ.get("RABBITMQ_DEFAULT_PASS")
queue_name_data = "smarthomes"
queue_name_info = "smarthomes_info"
exchange_name = "smarthomes_exchange"
routing_key_data = "smarthomes_routing_json_key"
routing_key_info = "smarthomes_info_routing_key"

requests_cache.install_cache("ren_cache", expire_after=900)


def generate_random_data(house_id: int, devices: list[dict]) -> dict[str, any]:
    headers = {
        "Accept": "application/json",
    }

    url = "https://datahub.ren.pt/service/Electricity/ProductionBreakdown/1266"

    response = requests.post(url, headers=headers)
    data = json.loads(response.text)

    hydroelectric_grid = wind_grid = gas_grid = solar_grid = biomass_grid = 0

    for series in data["series"]:
        match series["name"]:
            case "Hídrica":
                hydroelectric_grid = round((series["data"][-2])) * 1000000
            case "Eólica":
                wind_grid = round((series["data"][-2])) * 1000000
            case "Gás Natural":
                gas_grid = round((series["data"][-2])) * 1000000
            case "Solar":
                solar_grid = round((series["data"][-2])) * 1000000
            case "Biomassa":
                biomass_grid = round((series["data"][-2])) * 1000000

    total_grid = hydroelectric_grid + wind_grid + gas_grid + solar_grid + biomass_grid
    renewable_grid = round(
        (hydroelectric_grid + wind_grid + solar_grid + biomass_grid) * 100 / total_grid,
    )

    solar_house = round(random.uniform(0, 2500))
    wind_house = round(random.uniform(0, 1000))
    grid_exchange = round(random.uniform(-(solar_house + wind_house), 4000))
    total_house = round(solar_house + wind_house + grid_exchange)
    self_sufficiency = round(
        100 * (1 - grid_exchange / total_house) if grid_exchange > 0 else 100
    )
    renewable_house = round(
        self_sufficiency + (100 - self_sufficiency) / 100 * renewable_grid
    )

    emissions = round((1 - renewable_house / 100) * 450)
    renewable_forecast_day = [round(random.uniform(50, 100)) for _ in range(3)]
    renewable_forecast_hour = [round(random.uniform(50, 100)) for _ in range(3)]

    water_kitchen = round(random.uniform(0, 100))
    water_baths = round(random.uniform(0, 100))
    water_garden = round(random.uniform(0, 25))
    water_other = round(random.uniform(0, 50))
    water_total = water_kitchen + water_baths + water_garden + water_other
    water_today_forecast = round(random.uniform(water_total - 25, water_total + 50))

    costs_electricity = round((grid_exchange if grid_exchange > 0 else 0) * 0.0001, 2)
    costs_water = round(water_total * 0.00001, 2)
    costs_total = costs_electricity + costs_water

    if devices is None:
        devices = []
    else:
        length_devices = len(devices)
        for i in range(length_devices):
            devices[i]["power"] = (
                round(random.uniform(0, total_house / length_devices))
                if devices[i]["turnedOn"] is True
                else 0
            )

    return {
        "id": house_id,
        "power": {
            "grid": {
                "hydro": hydroelectric_grid,
                "wind": wind_grid,
                "gas": gas_grid,
                "solar": solar_grid,
                "biomass": biomass_grid,
                "total": total_grid,
                "renewable": renewable_grid,
            },
            "house": {
                "solar": solar_house,
                "wind": wind_house,
                "grid_exchange": grid_exchange,
                "total": total_house,
                "self_sufficiency": self_sufficiency,
                "renewable": renewable_house,
                "emissions": emissions,
                "renewable_forecast_day": renewable_forecast_day,
                "renewable_forecast_hour": renewable_forecast_hour,
            },
        },
        "water": {
            "kitchen": water_kitchen,
            "bath": water_baths,
            "garden": water_garden,
            "other": water_other,
            "total": water_total,
            "forecast_today": water_today_forecast,
        },
        "costs": {
            "electricity": costs_electricity,
            "water": costs_water,
            "today": costs_total,
        },
        "devices": devices,
    }


def send_data_to_rabbitmq(ch: BlockingChannel, json_data: str) -> None:
    """
    Send a serialized JSON object to RabbitMQ.
    :param ch: Channel to send
    :param json_data: Serialized JSON string
    :return:
    """
    ch.basic_publish(
        exchange=exchange_name,
        routing_key=routing_key_data,
        body=json_data,
    )


def callback(
    ch: BlockingChannel,
    method: spec.Basic.Deliver,
    properties: spec.BasicProperties,
    body: bytes,
) -> None:
    """
    Parse the received message.
    :param ch: Channel from where the message was sent
    :param method: 🤷
    :param properties: 🤷
    :param body: Serialized message
    :return:
    """
    houses: list[dict[str, int | str | list | None]] = json.loads(body)
    print(f"Parsed JSON: {houses}")
    for house in houses:
        house_data = generate_random_data(house["houseId"], house["devices"])
        json_data = json.dumps(house_data)
        print(f"Sending {json_data}")
        send_data_to_rabbitmq(channel, json_data)


if __name__ == "__main__":
    credentials = pika.PlainCredentials(
        username, password if password is not None else ""
    )
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host, port, "/", credentials)
    )
    channel = connection.channel()

    channel.queue_declare(queue=queue_name_data)
    channel.queue_declare(queue=queue_name_info)
    channel.exchange_declare(exchange=exchange_name)

    channel.queue_bind(
        queue=queue_name_data, exchange=exchange_name, routing_key=routing_key_data
    )
    channel.queue_bind(
        queue=queue_name_info, exchange=exchange_name, routing_key=routing_key_info
    )

    try:
        channel.basic_consume(
            queue=queue_name_info,
            on_message_callback=callback,
            exclusive=True,
            auto_ack=True,
        )
        channel.start_consuming()
    except Exception as e:
        print("Exception found: ", e)
        print("Closing connection...")
        connection.close()
