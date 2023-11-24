package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class RabbitMQProperties {

    @NotEmpty
    private int house_id;

    @NotEmpty
    private List<Float> grid;

    @NotEmpty
    private float totalConsumption;

}
