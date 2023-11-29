package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.influxdb.client.InfluxDBClient;
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
    private InfluxDBClient influxDBClient;

    @RabbitListener(queues = {QUEUE_NAME})
    public void consumeMessage(final Message message) {

        log.info("Received message: [{}]", message);

        try {
            // Convert Message object to JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonMessage = objectMapper.writeValueAsString(message);

            // Write JSON data to InfluxDB
            writeDataToInfluxDB(jsonMessage);
        } catch (Exception e) {
            log.error("Error while writing to InfluxDB: {}", e.getMessage());
        }
    }

    private void writeDataToInfluxDB(String jsonMessage) {
        try {
            // Create a data point
            Point point = Point.measurement("measurement_name")
                    .addField("data", jsonMessage)
                    .time(Instant.now(), WritePrecision.NS);

            // Write the point to InfluxDB
            influxDBClient.getWriteApi().writePoint("smarthomes", "smarthomes", point);
            log.info("Point inserted");
        } catch (Exception e) {
            log.error("Error while writing to InfluxDB: {}", e.getMessage());
        }
    }
}
