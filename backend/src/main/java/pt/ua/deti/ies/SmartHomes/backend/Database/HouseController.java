package pt.ua.deti.ies.SmartHomes.backend.Database;

import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

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

@AllArgsConstructor
@Getter
class EnvironmentData {
    private Instant time;
    private long self_sufficiency;
    private long renewable;
    private long emissions;
    private List<Long> renewable_forecast_day;
    private List<Long> renewable_forecast_hour;
}

@AllArgsConstructor
@Getter
class WaterData {
    private Instant time;
    private long kitchen;
    private long bath;
    private long garden;
    private long other;
    private long total;
    private long forecast_today;
}

@AllArgsConstructor
@Getter
class CostData {
    private Instant time;
    private long electricity;
    private long water;
    private long total;
}

@AllArgsConstructor
@Getter
class DevicePower {
    private int id;
    private long power;
}

@RestController
@AllArgsConstructor
@RequestMapping("service/house")
public class HouseController {
    @Autowired
    private QueryApi queryApi;

    @GetMapping("{id}/electricity")
    public ResponseEntity<List<ElectricityData>> getHouseSolar(@PathVariable String id) {
        List<ElectricityData> data = new ArrayList<>();
        String parametrizedQuery = String.format(
                "from(bucket: \"smarthomes\") |> range(start: -1d) |> filter(fn: (r) => r._measurement == \"%s\") |> pivot(rowKey: [\"_time\"], columnKey: [\"_field\"], valueColumn: \"_value\") |> drop(columns: [\"_start\", \"_stop\", \"_measurement\"])", id);

        List<FluxTable> result = queryApi.query(parametrizedQuery, "smarthomes");

        HttpStatus code = HttpStatus.OK;

        try {
            for (FluxTable fluxTable : result) {
                for (FluxRecord fluxRecord : fluxTable.getRecords()) {
                    ElectricityData electricityData = new ElectricityData(
                            fluxRecord.getTime(),
                            (long) fluxRecord.getValueByKey("grid_renewable"),
                            (long) fluxRecord.getValueByKey("house_solar"),
                            (long) fluxRecord.getValueByKey("house_wind"),
                            (long) fluxRecord.getValueByKey("house_grid_exchange"),
                            (long) fluxRecord.getValueByKey("house_total"),
                            (long) fluxRecord.getValueByKey("house_self_sufficiency"),
                            (long) fluxRecord.getValueByKey("house_renewable"));
                    data.add(electricityData);
                }
            }
            if (data.isEmpty()) {
                code = HttpStatus.NOT_FOUND;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            code = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(data, code);
    }
}
