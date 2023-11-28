package pt.ua.deti.ies.SmartHomes.backend.Database;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "Device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private long deviceId;

    @ManyToOne
    @JoinColumn(name = "house_id", nullable = false)
    @NotBlank(message = "House is mandatory")
    private House house;

    @NotBlank(message = "Device name is mandatory")
    private String name;

    @NotBlank(message = "House area is mandatory")
    private String houseArea;

    @Enumerated(EnumType.STRING)
    private DeviceType type;

    public Device(long deviceId, @NotBlank(message = "House is mandatory") House house,
            @NotBlank(message = "Device name is mandatory") String name,
            @NotBlank(message = "House area is mandatory") String houseArea, DeviceType type) {
        this.deviceId = deviceId;
        this.house = house;
        this.name = name;
        this.houseArea = houseArea;
        this.type = type;
    }

    public long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(long deviceId) {
        this.deviceId = deviceId;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHouseArea() {
        return houseArea;
    }

    public void setHouseArea(String houseArea) {
        this.houseArea = houseArea;
    }

    public DeviceType getType() {
        return type;
    }

    public void setType(DeviceType type) {
        this.type = type;
    }
}

