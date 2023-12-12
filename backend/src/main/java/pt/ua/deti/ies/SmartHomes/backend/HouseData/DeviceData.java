package pt.ua.deti.ies.SmartHomes.backend.HouseData;

import lombok.AllArgsConstructor;
import lombok.Getter;
import pt.ua.deti.ies.SmartHomes.backend.Devices.Device;
import pt.ua.deti.ies.SmartHomes.backend.Devices.DeviceType;

@AllArgsConstructor
@Getter
public class DeviceData {
    private long id;
    private DeviceType type;
    private String name;
    private String houseArea;
    private boolean on;
    private long power;

    public DeviceData(long id, long power) {
        this.id = id;
        this.power = power;
    }
}
