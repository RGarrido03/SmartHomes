package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.message.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import static pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.RabbitMQConfig.QUEUE_NAME;

@Slf4j
@Service
public class Listener {
    @RabbitListener(queues = {QUEUE_NAME})
    public void consumeMessage(final Message message) {
        log.info("Received message: [{}]", message);
    }
}
