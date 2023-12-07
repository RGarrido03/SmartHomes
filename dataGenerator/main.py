import json
import pika
import random
import time
import os
import requests


rate_env = os.environ.get("SECONDS_RATE")
seconds_rate = int(rate_env) if rate_env is not None else 5

# id_list = get_ids_from_rabbitmq()
host = "rabbitmq"
port = 5672
username = "rabbitmq"
password = os.environ.get("RABBITMQ_DEFAULT_PASS")
queue_name = "smarthomes"
exchange_name = "smarthomes_exchange"
routing_key = "smarthomes_routing_json_key"


def generate_random_data(house_id):
    headers = {
        "Accept": "application/json",
    }

    url = "https://datahub.ren.pt/service/Electricity/ProductionBreakdown/1266?culture=pt-PT&dayToSearchString=638375445673643573&useGasDate=false"

    response = requests.post(url, headers=headers)
    data = json.loads(response.text)

    # convert REM data from MW to W
    for series in data["series"]:
        if series["name"] == "Hídrica":
            hydroelectric_grid = round((series["data"][-2])) * 1000000
        elif series["name"] == "Eólica":
            wind_grid = round((series["data"][-2])) * 1000000
        elif series["name"] == "Gás Natural":
            gas_grid = round((series["data"][-2])) * 1000000
        elif series["name"] == "Solar":
            solar_grid = round((series["data"][-2])) * 1000000
        elif series["name"] == "Biomassa":
            biomass_grid = round((series["data"][-2])) * 1000000

    total_grid = round(
        hydroelectric_grid + wind_grid + gas_grid + solar_grid + biomass_grid
    )
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
            },
        },
    }


def send_data_to_rabbitmq(channel, json_data):
    channel.basic_publish(
        exchange=exchange_name,
        routing_key=routing_key,
        body=json_data,
    )


# id_list receives the IDs from the first connection from RabbitMQ
def get_ids_from_rabbitmq(channel):
    id_list = []
    while True:
        method_frame, header_frame, body = channel.basic_get(queue=queue_name)
        if method_frame is None:
            break
        else:
            channel.basic_ack(delivery_tag=method_frame.delivery_tag)
            id_list.append(int(body.decode()))

    return id_list


if __name__ == "__main__":
    credentials = pika.PlainCredentials(
        username, password if password is not None else ""
    )
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host, port, "/", credentials)
    )
    channel = connection.channel()
    channel.queue_declare(queue=queue_name)
    channel.exchange_declare(exchange=exchange_name)

    starttime = time.monotonic()
    while True:
        try:
            house_data = generate_random_data(1)
            json_data = json.dumps(house_data)

            send_data_to_rabbitmq(channel, json_data)
            print(json_data)

            # wait before generating the next set of data
            time.sleep(seconds_rate - ((time.monotonic() - starttime) % seconds_rate))
        except Exception:
            connection.close()
