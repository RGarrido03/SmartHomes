package pt.ua.deti.ies.SmartHomes.backend.Devices;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("service/devices")
public class DeviceController {
    private DeviceService deviceService;

    @GetMapping("{id}")
    public ResponseEntity<Device> getDeviceInfo(@PathVariable("id") long id) {
        Device device = deviceService.getDevice(id);
        return new ResponseEntity<>(device, device != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device savedDevice = deviceService.createDevice(device);
        return new ResponseEntity<>(savedDevice, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable("id") long deviceId, @RequestBody Device device) {
        device.setDeviceId(deviceId);
        Device updatedDevice = deviceService.updateDevice(device);
        return new ResponseEntity<>(updatedDevice, updatedDevice != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDevice(@PathVariable("id") long deviceId) {
        deviceService.deleteDevice(deviceId);
        return new ResponseEntity<>("Device successfully deleted.", HttpStatus.OK);
    }
}
