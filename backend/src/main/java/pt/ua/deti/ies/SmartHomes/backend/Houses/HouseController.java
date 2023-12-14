package pt.ua.deti.ies.SmartHomes.backend.Houses;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.SmartHomes.backend.Devices.DeviceService;
import pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.Sender;

@RestController
@AllArgsConstructor
@RequestMapping("api/houses")
public class HouseController {
    private HouseService houseService;
    private DeviceService deviceService;
    private Sender sender;

    @GetMapping("{id}")
    public ResponseEntity<House> getHouse(@PathVariable("id") long id) {
        House house = houseService.getHouse(id);
        return new ResponseEntity<>(house, house != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<House> createHouse(@RequestBody House house) {
        House savedDevice = houseService.createHouse(house);
        sender.sendHousesInfo();
        return new ResponseEntity<>(savedDevice, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<House> updateHouse(@PathVariable("id") long houseId, @RequestBody House house) {
        house.setHouseId(houseId);
        House updatedHouse = houseService.updateHouse(house);
        sender.sendHousesInfo();
        return new ResponseEntity<>(updatedHouse, updatedHouse != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteHouse(@PathVariable("id") long houseId) {
        House house = houseService.getHouse(houseId);

        // Delete associated devices
        house.getDevices().forEach(device -> deviceService.deleteDevice(device.getDeviceId()));

        houseService.deleteHouse(houseId);
        sender.sendHousesInfo();
        return new ResponseEntity<>("House successfully deleted.", HttpStatus.OK);
    }
}
