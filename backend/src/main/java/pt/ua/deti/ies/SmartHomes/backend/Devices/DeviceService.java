package pt.ua.deti.ies.SmartHomes.backend.Devices;

import java.util.List;

public interface DeviceService {
    Device createDevice(Device device);

    Device getDevice(long id);

    Device updateDevice(Device device);

    void deleteDevice(long id);

    Device changeState(long id, boolean on);

    List<Device> getAllDevices(long house_id);
}
