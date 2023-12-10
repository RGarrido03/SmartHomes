package pt.ua.deti.ies.SmartHomes.backend.Devices;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeviceServiceImpl implements DeviceService {
    private DeviceRepository deviceRepository;

    @Override
    public Device createDevice(Device device) {
        return deviceRepository.save(device);
    }

    @Override
    public Device getDevice(long id) {
        return deviceRepository.findById(id).orElse(null);
    }

    @Override
    public Device updateDevice(Device device) {
        Optional<Device> existingOpt = deviceRepository.findById(device.getDeviceId());

        if (existingOpt.isPresent()) {
            Device existing = existingOpt.get();
            existing.setType(device.getType());
            existing.setHouse(device.getHouse());
            existing.setName(device.getName());
            existing.setHouseArea(device.getHouseArea());
            existing.setTurnedOn(device.isTurnedOn());
            return deviceRepository.save(existing);
        }
        else {
            return null;
        }
    }

    @Override
    public void deleteDevice(long id) {
        deviceRepository.deleteById(id);
    }

    @Override
    public Device changeState(long id, boolean on) {
        Device device = deviceRepository.findById(id).orElse(null);
        if (device == null) {
            return null;
        }
        device.setTurnedOn(on);
        deviceRepository.save(device);
        return device;
    }

    @Override
    public List<Device> getAllDevices(long house_id) {
        return deviceRepository.findByHouseHouseId(house_id);
    }
}
