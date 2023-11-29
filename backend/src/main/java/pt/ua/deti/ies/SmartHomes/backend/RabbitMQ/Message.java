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
    private long house_id;

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
    private long hydro;

    @NotEmpty
    private long wind;

    @NotEmpty
    private long gas;

    @NotEmpty
    private long solar;

    @NotEmpty
    private long biomass;

    @NotEmpty
    private long total;

    @NotEmpty
    private long renewable;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class House {
    @NotEmpty
    private long solar;

    @NotEmpty
    private long wind;

    @NotEmpty
    private long grid_exchange;

    @NotEmpty
    private long total;

    @NotEmpty
    private long self_sufficiency;

    @NotEmpty
    private long renewable;
}