package pt.ua.deti.ies.SmartHomes.backend.InfluxDB;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.QueryApi;
import com.influxdb.client.WriteApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class InfluxDBConfig {

    @Value("${spring.influx.url}")
    private String influxUrl;

    @Value("${spring.influx.token}")
    private String token;

    @Value("${spring.influx.bucket}")
    public String bucket;

    @Value("${spring.influx.org}")
    public String org;

    @Bean
    public InfluxDBClient influxDBClient() {
        return InfluxDBClientFactory.create(influxUrl, token.toCharArray(), org, bucket);
    }

    @Autowired
    @Lazy
    private InfluxDBClient influxDBClient;

    @Bean
    public WriteApi writeApi() {
        return influxDBClient.makeWriteApi();
    }

    @Bean
    public QueryApi queryApi() {
        return influxDBClient.getQueryApi();
    }
}

