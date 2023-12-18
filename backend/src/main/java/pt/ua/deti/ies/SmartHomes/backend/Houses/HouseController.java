package pt.ua.deti.ies.SmartHomes.backend.Houses;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

import pt.ua.deti.ies.SmartHomes.backend.Devices.DeviceService;
import pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.Sender;

@RestController
@RestControllerAdvice
@Tag(name = "Houses")
@AllArgsConstructor
@RequestMapping("api/houses")
public class HouseController {
    @Autowired
    private HouseService houseService;
    private DeviceService deviceService;
    private Sender sender;


    @Operation(summary = "Get house by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "House found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = House.class)) }),

            @ApiResponse(responseCode = "404", description = "House not found",
                    content = @Content) })
    @GetMapping("{id}")
    public ResponseEntity<House> getHouse(@PathVariable("id") long id) {
        House house = houseService.getHouse(id);
        return new ResponseEntity<>(house, house != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Create house")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "House created",
                    content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = House.class)) })
    })
    @PostMapping
    public ResponseEntity<House> createHouse(@RequestBody House house) {
        House savedDevice = houseService.createHouse(house);
        sender.sendHousesInfo();
        return new ResponseEntity<>(savedDevice, HttpStatus.CREATED);
    }

    @Operation(summary = "Edit house info by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "House edited",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = House.class)) }),

            @ApiResponse(responseCode = "404", description = "House not found",
                    content = @Content) })
    @PutMapping("{id}")
    public ResponseEntity<House> updateHouse(@PathVariable("id") long houseId, @RequestBody House house) {
        house.setHouseId(houseId);
        House updatedHouse = houseService.updateHouse(house);
        sender.sendHousesInfo();
        return new ResponseEntity<>(updatedHouse, updatedHouse != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Delete house by id and their respective devices")
    @ResponseStatus(HttpStatus.OK)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200")
    })
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
