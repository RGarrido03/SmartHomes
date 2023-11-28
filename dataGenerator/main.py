import json
import pika
import random
import time

# id_list = get_ids_from_rabbitmq()

id_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]


def generate_random_data(house_id):
    hydroelectric_grid = round(random.uniform(0, 8200000000), 3)
    wind_grid = round(random.uniform(0, 5400000000), 3)
    gas_grid = round(random.uniform(0, 2700000000), 3)
    solar_grid = round(random.uniform(0, 2200000000), 3)
    biomass_grid = round(random.uniform(0, 700000000), 3)
    total_grid = round(
        hydroelectric_grid + wind_grid + gas_grid + solar_grid + biomass_grid, 3
    )
    renewable_grid = round(
        (hydroelectric_grid + wind_grid + solar_grid + biomass_grid) * 100 / total_grid,
        3,
    )

    solar_house = round(random.uniform(0, 2500), 3)
    wind_house = round(random.uniform(0, 1000), 3)
    grid_exchange = round(random.uniform(-3500, 4000), 3)
    total_house = round(solar_house + wind_house + grid_exchange, 3)
    self_sufficiency = round(100 * (1 - grid_exchange / total_house) if grid_exchange > 0 else 100, 3)
    renewable_house = round(self_sufficiency + (100 - self_sufficiency) / 100 * renewable_grid, 3)

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


def send_data_to_rabbitmq(json_data):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters("localhost:5672")
    )  # replace with your RabbitMQ server
    channel = connection.channel()

    channel.queue_declare(queue="house_data")  # replace with your queue name

    channel.basic_publish(
        exchange="",
        routing_key="house_data",  # replace with your queue name
        body=json_data,
    )

    connection.close()


# id_list receives the IDs from the first connection from RabbitMQ
def get_ids_from_rabbitmq():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters("localhost")
    )  # replace with your RabbitMQ server
    channel = connection.channel()

    id_list = []
    while True:
        method_frame, header_frame, body = channel.basic_get(
            queue="id_queue"
        )  # replace with your queue name
        if method_frame is None:
            break
        else:
            channel.basic_ack(delivery_tag=method_frame.delivery_tag)
            id_list.append(int(body.decode()))

    connection.close()

    return id_list


if __name__ == "__main__":
    while True:
        for house_id in id_list:
            house_data = generate_random_data(house_id)
            json_data = json.dumps(house_data)
            # send_data_to_rabbitmq(json_data)
            # print all formatted data
            print("House ID: ", house_data["id"])
            print("Power Supplied")
            print("Grid")
            print(
                " Hydroelectric: ",
                house_data["power_supplied"]["grid"]["hydroelectric"],
            )
            print(" Wind: ", house_data["power_supplied"]["grid"]["wind"])
            print(" Coal: ", house_data["power_supplied"]["grid"]["coal"])
            print(" Solar: ", house_data["power_supplied"]["grid"]["solar"])
            print(" Other: ", house_data["power_supplied"]["grid"]["other"])
            print(" Total Grid: ", house_data["power_supplied"]["grid"]["total_grid"])
            print("House")
            print(
                " Hydroelectric: ",
                house_data["power_supplied"]["house"]["hydroelectric"],
            )
            print(" Wind: ", house_data["power_supplied"]["house"]["wind"])
            print(
                " Total House: ", house_data["power_supplied"]["house"]["total_house"]
            )
            print("Total: ", house_data["power_supplied"]["total"])
            print("\n")
        time.sleep(1)  # wait for 1 second before generating the next set of data
