package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import static pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.RabbitMQConfig.EXCHANGE_NAME;
import static pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.RabbitMQConfig.ROUTING_KEY;

@Slf4j
@Service
public class Sender {

    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public Sender(RabbitTemplate rabbitTemplate) {
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
        this.rabbitTemplate = rabbitTemplate;
    }

    // Send a message every 3 seconds
    // @Scheduled(fixedDelay = 3000L)
    // public void sendJsonMessage() {
    //     Message message = new Message(1, "Bruno", 34);
    //     rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, message);
    //     log.info("Json message sent");
    // }
}
