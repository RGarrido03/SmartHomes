package pt.ua.deti.ies.SmartHomes.backend;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;
import pt.ua.deti.ies.SmartHomes.backend.InfluxDB.InfluxDBConfig;

@SpringBootApplication
@EnableRabbit
@EnableScheduling

//import configuration of InfluxDB
@Import(InfluxDBConfig.class)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
