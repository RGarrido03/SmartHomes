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
    private float hydro;

    @NotEmpty
    private float wind;

    @NotEmpty
    private float gas;

    @NotEmpty
    private float solar;

    @NotEmpty
    private float biomass;

    @NotEmpty
    private float total;

    @NotEmpty
    private float renewable;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class House {
    @NotEmpty
    private float solar;

    @NotEmpty
    private float wind;

    @NotEmpty
    private float grid_exchange;

    @NotEmpty
    private float total;

    @NotEmpty
    private float self_sufficiency;

    @NotEmpty
    private float renewable;
}