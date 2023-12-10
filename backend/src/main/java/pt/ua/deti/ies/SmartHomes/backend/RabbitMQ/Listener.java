package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import com.influxdb.client.WriteApi;
import com.influxdb.client.domain.WritePrecision;
import lombok.extern.slf4j.Slf4j;
import com.influxdb.client.write.Point;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

import static pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.RabbitMQConfig.QUEUE_NAME;

@Slf4j
@Service
public class Listener {
    @Autowired
    private WriteApi writeApi;

    @RabbitListener(queues = {QUEUE_NAME})
    public void consumeMessage(final Message message) {
        try {
            log.info("Received message: [{}]", message);
            writeDataToInfluxDB(message);
        } catch (Exception e) {
            log.error("Error while writing to InfluxDB: {}", e.getMessage());
        }
    }

    private void writeDataToInfluxDB(Message message) {
        // Create a data point
        Point house = Point.measurement(String.valueOf(message.getId()))
                           // Other grid values are ignored
                           .addField("grid_renewable", message.getPower().getGrid().getRenewable())
                           .addField("house_solar", message.getPower().getHouse().getSolar())
                           .addField("house_wind", message.getPower().getHouse().getWind())
                           .addField("house_grid_exchange", message.getPower().getHouse().getGrid_exchange())
                           .addField("house_total", message.getPower().getHouse().getTotal())

                           .addField("house_self_sufficiency", message.getPower().getHouse().getSelf_sufficiency())
                           .addField("house_renewable", message.getPower().getHouse().getRenewable())
                           .addField("emissions", message.getPower().getHouse().getEmissions())

                           .addField("renewable_forecast_day_0",
                                     message.getPower().getHouse().getRenewable_forecast_day().get(0))
                           .addField("renewable_forecast_day_1",
                                     message.getPower().getHouse().getRenewable_forecast_day().get(1))
                           .addField("renewable_forecast_day_2",
                                     message.getPower().getHouse().getRenewable_forecast_day().get(2))
                           .addField("renewable_forecast_hour_0",
                                     message.getPower().getHouse().getRenewable_forecast_hour().get(0))
                           .addField("renewable_forecast_hour_1",
                                     message.getPower().getHouse().getRenewable_forecast_hour().get(1))
                           .addField("renewable_forecast_hour_2",
                                     message.getPower().getHouse().getRenewable_forecast_hour().get(2))

                           .addField("water_kitchen", message.getWater().getKitchen())
                           .addField("water_bath", message.getWater().getBath())
                           .addField("water_garden", message.getWater().getGarden())
                           .addField("water_other", message.getWater().getOther())
                           .addField("water_total", message.getWater().getTotal())
                           .addField("water_forecast_today", message.getWater().getForecast_today())

                           .addField("costs_electricity", message.getCosts().getElectricity())
                           .addField("costs_water", message.getCosts().getWater())
                           .addField("costs_total", message.getCosts().getToday())

                           .time(Instant.now(), WritePrecision.NS);

        writeApi.writePoint("smarthomes", "smarthomes", house);

        for (Device d : message.getDevices()) {
            Point device_measurement = Point.measurement("device_" + d.getId())
                                            .addField("power", d.getPower())
                                            .time(Instant.now(), WritePrecision.NS);
            writeApi.writePoint("smarthomes", "smarthomes", device_measurement);
        }

        log.info("Points inserted");
    }
}
