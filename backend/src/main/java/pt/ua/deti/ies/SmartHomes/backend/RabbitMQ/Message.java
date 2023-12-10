package pt.ua.deti.ies.SmartHomes.backend.RabbitMQ;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class Message {
    @NotEmpty
    private long id;

    @NotEmpty
    private Power power;

    @NotEmpty
    private Water water;

    @NotEmpty
    private Costs costs;

    @NotEmpty
    private List<Device> devices;
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

    @NotEmpty
    private long emissions;

    @NotEmpty
    private List<Long> renewable_forecast_day;

    @NotEmpty
    private List<Long> renewable_forecast_hour;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class Water {
    @NotEmpty
    private long kitchen;

    @NotEmpty
    private long bath;

    @NotEmpty
    private long garden;

    @NotEmpty
    private long other;

    @NotEmpty
    private long total;

    @NotEmpty
    private long forecast_today;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class Costs {
    @NotEmpty
    private double electricity;

    @NotEmpty
    private double water;

    @NotEmpty
    private double today;
}

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
class Device {
    @NotEmpty
    private int id;

    @NotEmpty
    private long power;
}