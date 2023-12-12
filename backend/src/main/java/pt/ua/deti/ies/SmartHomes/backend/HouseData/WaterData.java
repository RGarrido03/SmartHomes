package pt.ua.deti.ies.SmartHomes.backend.HouseData;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@AllArgsConstructor
@Getter
public class WaterData {
    private Instant time;
    private long kitchen;
    private long bath;
    private long garden;
    private long other;
    private long total;
    private long forecast_today;
}
