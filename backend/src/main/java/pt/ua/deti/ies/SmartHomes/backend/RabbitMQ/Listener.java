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
        Point point = Point.measurement(String.valueOf(message.getHouse_id()))
                            //Grid values
                           .addField("grid_hydro", message.getPower().getGrid().getHydro())
                           .addField("grid_wind", message.getPower().getGrid().getWind())
                           .addField("grid_gas", message.getPower().getGrid().getGas())
                           .addField("grid_gas", message.getPower().getGrid().getGas())
                           .addField("grid_solar", message.getPower().getGrid().getSolar())
                           .addField("grid_biomass", message.getPower().getGrid().getBiomass())
                           .addField("grid_total", message.getPower().getGrid().getTotal())
                           .addField("grid_renewable", message.getPower().getGrid().getRenewable())

                            //House values
                           .addField("house_solar", message.getPower().getHouse().getSolar())
                           .addField("house_wind", message.getPower().getHouse().getWind())
                           .addField("house_grid_exchange", message.getPower().getHouse().getGrid_exchange())
                           .addField("house_total", message.getPower().getHouse().getTotal())
                           .addField("house_self_sufficiency", message.getPower().getHouse().getSelf_sufficiency())
                           .addField("house_renewable", message.getPower().getHouse().getRenewable())
                           .time(Instant.now(), WritePrecision.NS);

        // Write the point to InfluxDB
        writeApi.writePoint("smarthomes", "smarthomes", point);
        log.info("Point inserted");
    }
}