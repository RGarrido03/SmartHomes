package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class RabbitMQSender {

    private static final Logger log = (Logger) LoggerFactory.getLogger(RabbitMQSender.class);

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    //send message every 3 seconds
    @Scheduled(fixedDelay = 3000L)
    public void sendJsonMessage(){
        RabbitMQProperties message = new RabbitMQProperties(1, "Bruno" , 34);
        rabbitTemplate.convertAndSend("smarthomes_exchange", "smarthomes_routing_json_key", message);
        log.info("Json message sent");
    }
}
