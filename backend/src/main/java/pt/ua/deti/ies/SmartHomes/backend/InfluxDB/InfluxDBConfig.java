package pt.ua.deti.ies.SmartHomes.backend.InfluxDB;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.WriteApi;
import com.influxdb.client.write.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InfluxDBConfig {

    @Value("${spring.influx.url}")
    private String influxUrl;

    @Value("${spring.influx.username}")
    private String username;

    @Value("${spring.influx.password}")
    private String password;

    @Value("${spring.influxdb.database}")
    private String database;

    @Value("${spring.influxdb.token}")
    private String token;

    @Value("${spring.influxdb.bucket}")
    private String bucket;

    @Value("${spring.influxdb.org}")
    private String org;

    @Autowired
    private InfluxDBClient influxDBClient;

    @Bean
    public InfluxDBClient influxDBClient() {
        return InfluxDBClientFactory.create(influxUrl, token.toCharArray());
    }

    public void writeData() {
        WriteApi writeApi = influxDBClient.makeWriteApi();

        //example of an insert
        Point point = Point.measurement("cpu").addField("idle", 90L).addField("user", 9L).addField("system", 1L);

        writeApi.writePoint(bucket, org, point);
    }
}

