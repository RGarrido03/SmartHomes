package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import org.apache.logging.log4j.message.Message;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class RabbitMQListener {

    private static final Logger log = (Logger) LoggerFactory.getLogger(RabbitMQSender.class);

    @RabbitListener(queues = "smarthomes")
    public void consumeMessage(final Message message){
        log.info("Received message: {}");
    }
}
