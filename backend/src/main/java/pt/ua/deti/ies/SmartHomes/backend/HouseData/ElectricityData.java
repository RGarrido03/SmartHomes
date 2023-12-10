package pt.ua.deti.ies.SmartHomes.backend.HouseData;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@AllArgsConstructor
@Getter
class ElectricityData {
    private Instant time;
    private long grid_renewable;
    private long house_solar;
    private long house_wind;
    private long house_grid_exchange;
    private long house_total;
    private long house_self_sufficiency;
    private long house_renewable;
}
