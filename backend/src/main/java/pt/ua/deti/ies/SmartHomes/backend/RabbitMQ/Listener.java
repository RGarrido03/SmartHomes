package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.domain.WritePrecision;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import com.influxdb.client.write.Point;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.time.Instant;

import static pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.RabbitMQConfig.QUEUE_NAME;
@Slf4j
@Service
public class Listener {

    @Autowired
    private InfluxDBClient influxDBClient;

    @RabbitListener(queues = {QUEUE_NAME})
    public void consumeMessage(final Message message) {

        log.info("Received message: [{}]", message);

        try {
            // Write JSON data to InfluxDB
            writeDataToInfluxDB(message);
        } catch (Exception e) {
            log.error("Error while writing to InfluxDB: {}", e.getMessage());
        }
    }

    private void writeDataToInfluxDB(Message message) {
        try {
            // Create a data point
            Point point = Point.measurement(String.valueOf(message.getHouse_id()))
                    .addField("data", message.getHouse_id())
                    .time(Instant.now(), WritePrecision.NS);

            // Write the point to InfluxDB
            influxDBClient.getWriteApiBlocking().writePoint("smarthomes", "smarthomes", point);
            log.info("Point inserted");
        } catch (Exception e) {
            log.error("Error while writing to InfluxDB: {}", e.getMessage());
        }
    }
    @PreDestroy
    public void cleanUp() {
        if (influxDBClient != null) {
            influxDBClient.close();
        }
    }

}
