package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class Message {
    @NotEmpty
    private int house_id;

    @NotEmpty
    private Power power;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class Power {

    @NotEmpty
    private Grid grid;

    @NotEmpty
    private House house;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class Grid {
    @NotEmpty
    private double hydro;

    @NotEmpty
    private double wind;

    @NotEmpty
    private double gas;

    @NotEmpty
    private double solar;

    @NotEmpty
    private double biomass;

    @NotEmpty
    private double total;

    @NotEmpty
    private double renewable;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class House {
    @NotEmpty
    private double solar;

    @NotEmpty
    private double wind;

    @NotEmpty
    private double grid_exchange;

    @NotEmpty
    private double total;

    @NotEmpty
    private double self_sufficiency;

    @NotEmpty
    private double renewable;
}