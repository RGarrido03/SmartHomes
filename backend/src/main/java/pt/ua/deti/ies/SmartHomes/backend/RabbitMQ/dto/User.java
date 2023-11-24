package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.dto;

import lombok.Data;

@Data
public class User {
    private int id;
    private String firstName;
    private String lastName;
}
