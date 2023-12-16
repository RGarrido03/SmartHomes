package pt.ua.deti.ies.SmartHomes.backend.Devices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.SmartHomes.backend.RabbitMQ.Sender;

@RestController
@RestControllerAdvice
@AllArgsConstructor
@RequestMapping("api/devices")
public class DeviceController {
    private DeviceService deviceService;
    private Sender sender;

    @Operation(summary = "Get device info by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the device",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = DeviceController.class)) }),

            @ApiResponse(responseCode = "400", description = "Invalid device id supplied",
                    content = @Content),

            @ApiResponse(responseCode = "404", description = "Device not found",
                    content = @Content) })
    @GetMapping("{id}")
    public ResponseEntity<Device> getDeviceInfo(@PathVariable("id") long id) {
        Device device = deviceService.getDevice(id);
        return new ResponseEntity<>(device, device != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Creation of a device")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device savedDevice = deviceService.createDevice(device);
        sender.sendHousesInfo();
        return new ResponseEntity<>(savedDevice, HttpStatus.CREATED);
    }

    @Operation(summary = "Edit a device by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Device edited",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = DeviceController.class)) }),

            @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                    content = @Content),

            @ApiResponse(responseCode = "404", description = "Device not found",
                    content = @Content) })
    @PutMapping("{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable("id") long deviceId, @RequestBody Device device) {
        device.setDeviceId(deviceId);
        Device updatedDevice = deviceService.updateDevice(device);
        sender.sendHousesInfo();
        return new ResponseEntity<>(updatedDevice, updatedDevice != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Turns on a device by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Device turned on",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = DeviceController.class)) }),

            @ApiResponse(responseCode = "400", description = "Invalid device id supplied",
                    content = @Content),

            @ApiResponse(responseCode = "404", description = "Device not found",
                    content = @Content) })
    @PatchMapping("{id}/on")
    public ResponseEntity<Device> turnOnDevice(@PathVariable("id") long deviceId) {
        Device device = deviceService.changeState(deviceId, true);
        sender.sendHousesInfo();
        return new ResponseEntity<>(device, device != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Turns off a device by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Device turned off",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = DeviceController.class)) }),

            @ApiResponse(responseCode = "400", description = "Invalid device id supplied",
                    content = @Content),

            @ApiResponse(responseCode = "404", description = "Device not found",
                    content = @Content) })
    @PatchMapping("{id}/off")
    public ResponseEntity<Device> turnOffDevice(@PathVariable("id") long deviceId) {
        Device device = deviceService.changeState(deviceId, false);
        sender.sendHousesInfo();
        return new ResponseEntity<>(device, device != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Deletion of a device")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDevice(@PathVariable("id") long deviceId) {
        deviceService.deleteDevice(deviceId);
        sender.sendHousesInfo();
        return new ResponseEntity<>("Device successfully deleted.", HttpStatus.OK);
    }
}
