package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.SmartHomes.backend.Houses.House;
import pt.ua.deti.ies.SmartHomes.backend.Houses.HouseService;

import java.util.List;

import static pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.RabbitMQConfig.*;

@Slf4j
@Service
public class Sender {

    private final RabbitTemplate rabbitTemplate;
    @Autowired
    private HouseService houseService;

    public Sender(RabbitTemplate rabbitTemplate) {
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
        this.rabbitTemplate = rabbitTemplate;
    }

    @Scheduled(fixedDelay = 5000L)
    public void sendHousesInfo() {
        List<House> houses = houseService.getAllHouses();
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, INFO_ROUTING_KEY, houses);
        log.info("Sent houses information to RabbitMQ");
    }
}
