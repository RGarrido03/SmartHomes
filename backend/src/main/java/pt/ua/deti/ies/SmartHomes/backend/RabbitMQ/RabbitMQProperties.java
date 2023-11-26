package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RabbitMQProperties implements Serializable {

    @NotEmpty
    private int house_id;

    @NotEmpty
    private String grid;

    @NotEmpty
    private float totalConsumption;

    public RabbitMQProperties(int house_id, String grid, float totalConsumption) {
        this.house_id = house_id;
        this.grid = grid;
        this.totalConsumption = totalConsumption;
    }

    public int getHouse_id() {
        return house_id;
    }

    public String getGrid() {
        return grid;
    }

    public float getTotalConsumption() {
        return totalConsumption;
    }

    @Override
    public String toString() {
        return "RabbitMQProperties{" +
                "house_id=" + house_id +
                ", grid=" + grid +
                ", totalConsumption=" + totalConsumption +
                '}';
    }
}
