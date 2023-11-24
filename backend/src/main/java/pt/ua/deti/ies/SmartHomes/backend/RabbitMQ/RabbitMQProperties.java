package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RabbitMQProperties {

    @NotEmpty
    private int house_id;

    @NotEmpty
    private float[] grid;

    @NotEmpty
    private float totalConsumption;

}
