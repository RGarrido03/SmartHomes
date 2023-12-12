package pt.ua.deti.ies.SmartHomes.backend.HouseData;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@Getter
public class EnvironmentData {
    private Instant time;
    private long self_sufficiency;
    private long renewable;
    private long emissions;
    private List<Long> renewable_forecast_day;
    private List<Long> renewable_forecast_hour;
}
