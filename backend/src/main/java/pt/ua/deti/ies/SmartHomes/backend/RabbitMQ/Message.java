package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;

import java.io.Serializable;

@Getter
@Data
public class Message implements Serializable {
    @NotEmpty
    private int house_id;

    @NotEmpty
    private String grid;

    @NotEmpty
    private float totalConsumption;

    public Message(int house_id, String grid, float totalConsumption) {
        this.house_id = house_id;
        this.grid = grid;
        this.totalConsumption = totalConsumption;
    }
}
