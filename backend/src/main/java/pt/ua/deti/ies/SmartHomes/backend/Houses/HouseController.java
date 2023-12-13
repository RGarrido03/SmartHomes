package pt.ua.deti.ies.SmartHomes.backend.Houses;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
@RequestMapping("api/houses")
public class HouseController {
    @Autowired
    private HouseService houseService;

    @GetMapping("{id}")
    public ResponseEntity<House> getHouse(@PathVariable("id") long id) {
        House house = houseService.getHouse(id);
        return new ResponseEntity<>(house, house != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<House> createHouse(@RequestBody House house) {
        House savedDevice = houseService.createHouse(house);
        return new ResponseEntity<>(savedDevice, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<House> updateDevice(@PathVariable("id") long houseId, @RequestBody House house) {
        house.setHouseId(houseId);
        House updatedHouse = houseService.updateHouse(house);
        return new ResponseEntity<>(updatedHouse, updatedHouse != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteHouse(@PathVariable("id") long houseId) {
        houseService.deleteHouse(houseId);
        return new ResponseEntity<>("House successfully deleted.", HttpStatus.OK);
    }    
}
