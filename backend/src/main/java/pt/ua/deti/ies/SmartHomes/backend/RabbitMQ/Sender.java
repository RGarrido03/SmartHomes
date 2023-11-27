package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Slf4j
@Service
public class Sender {


    private final RabbitTemplate rabbitTemplate;

    public Sender(RabbitTemplate rabbitTemplate) {

        this.rabbitTemplate = rabbitTemplate;
    }

    //send message every 3 seconds
    @Scheduled(fixedDelay = 3000L)
    public void sendJsonMessage(){
        Message message = new Message(1, "Bruno" , 34);
        rabbitTemplate.convertAndSend("smarthomes_exchange", "smarthomes_routing_json_key", message);
        log.info("Json message sent");
    }
}
