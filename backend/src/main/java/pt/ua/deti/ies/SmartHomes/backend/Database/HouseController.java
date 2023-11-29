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

    private double grid_hydro;
    private double grid_wind;
    private double grid_gas;
    private double grid_solar;
    private double grid_biomass;
    private double grid_total;
    private double grid_renewable;

    private double house_solar;
    private double house_wind;
    private double house_grid_exchange;
    private double house_total;
    private double house_self_sufficiency;
    private double house_renewable;
}

@RestController
@AllArgsConstructor
@RequestMapping("house")
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
                            (double) fluxRecord.getValueByKey("grid_hydro"),
                            (double) fluxRecord.getValueByKey("grid_wind"),
                            (double) fluxRecord.getValueByKey("grid_gas"),
                            (double) fluxRecord.getValueByKey("grid_solar"),
                            (double) fluxRecord.getValueByKey("grid_biomass"),
                            (double) fluxRecord.getValueByKey("grid_total"),
                            (double) fluxRecord.getValueByKey("grid_renewable"),
                            (double) fluxRecord.getValueByKey("house_solar"),
                            (double) fluxRecord.getValueByKey("house_wind"),
                            (double) fluxRecord.getValueByKey("house_grid_exchange"),
                            (double) fluxRecord.getValueByKey("house_total"),
                            (double) fluxRecord.getValueByKey("house_self_sufficiency"),
                            (double) fluxRecord.getValueByKey("house_renewable"));
                    data.add(electricityData);
                }
            }
            if (data.isEmpty()) {
                code = HttpStatus.NOT_FOUND;
            }
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            code = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(data, code);
    }
}
