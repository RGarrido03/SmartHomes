package pt.ua.deti.ies.SmartHomes.backend.InfluxDB;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.WriteApi;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
public class InfluxDBConfig {

    @Value("${spring.influx.url}")
    private String influxUrl;

    @Value("${spring.influx.token}")
    private String token;

    @Value("${spring.influx.bucket}")
    public String bucket;

    @Value("${spring.influx.org}")
    private String org;

    private WriteApi writeApi;

    @Bean
    public InfluxDBClient influxDBClient() {
        return InfluxDBClientFactory.create(influxUrl, token.toCharArray(), org, bucket);
    }

    @Autowired
    @Lazy
    private InfluxDBClient influxDBClient;

    @Scheduled(fixedDelay = 3000L)
    public void writeData() {

        try{

            if (writeApi == null){
                writeApi = influxDBClient.makeWriteApi();
            }

            // Use the existing WriteApi to write data
            writeApi.writePoint(bucket, org, Point.measurement("cpu")
                    .addField("idle", 90L)
                    .addField("user", 9L)
                    .addField("system", 1L)
                    .time(System.currentTimeMillis(), WritePrecision.NS));

        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for further investigation
        }
    }
}

