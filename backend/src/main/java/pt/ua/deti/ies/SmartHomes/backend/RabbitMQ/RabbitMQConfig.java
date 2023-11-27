package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE_NAME = "q.test-queue";
    public static final String EXCHANGE_NAME = "x.test-exchange";

    @Value("${spring.rabbitmq.host}")
    private String host;

    @Value("${spring.rabbitmq.port}")
    private int port;

    @Value("${spring.rabbitmq.username}")
    private String username;

    @Value("${spring.rabbitmq.password}")
    private String password;

    //Json Queue Values
    @Value("${spring.rabbitmq.queue.json.name}")
    public String jsonQueue;
    @Value("${spring.rabbitmq.routing.json.key}")
    public String routingJsonKey;

    //spring bean for queue (store json messages)
    // second parameter it means at restart RabbitMQ Queue won't survive
    @Bean
    public Queue jsonQueue(){
        return new Queue(QUEUE_NAME, false);
    }
    //spring bean for rabbitMQ exchange
    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(EXCHANGE_NAME, false, false);
    }

    //binding between json queue and exchange using routing key
    @Bean
    public Binding jsonBinding(Queue queue, TopicExchange exchange){
        return BindingBuilder.bind(queue)
                .to(exchange)
                .with(QUEUE_NAME);
    }

    @Bean
    public MessageConverter converter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public CachingConnectionFactory connectionFactory() {
        CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory(host);
        cachingConnectionFactory.setPort(port);
        cachingConnectionFactory.setUsername(username);
        cachingConnectionFactory.setPassword(password);
        return cachingConnectionFactory;
    }

    @Bean
    public RabbitAdmin rabbitAdmin(org.springframework.amqp.rabbit.connection.ConnectionFactory connectionFactory) {
        return new RabbitAdmin(connectionFactory);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(org.springframework.amqp.rabbit.connection.ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }


}
