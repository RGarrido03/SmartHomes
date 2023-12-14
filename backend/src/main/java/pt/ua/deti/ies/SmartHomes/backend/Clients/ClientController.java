package pt.ua.deti.ies.SmartHomes.backend.Clients;

import lombok.AllArgsConstructor;

import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import pt.ua.deti.ies.SmartHomes.backend.Devices.DeviceService;
import pt.ua.deti.ies.SmartHomes.backend.Houses.House;
import pt.ua.deti.ies.SmartHomes.backend.Houses.HouseService;

@RestController
@RestControllerAdvice
@AllArgsConstructor
@RequestMapping("api/clients")
public class ClientController {

    private ClientService clientService;
    private DeviceService deviceService;
    private HouseService houseService;

    @Operation(summary = "Get all of clients users")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.findAll();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @Operation(summary = "Creation of a client")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client Client) {
        Client savedClient = clientService.createClient(Client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    @Operation(summary = "Get client by id")
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User not found")
    @GetMapping("{id}")
    public ResponseEntity<Client> getClient(@PathVariable("id") long id) {
        Client client = clientService.getClient(id);
        return new ResponseEntity<>(client, client != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Get house by client id")
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Houses are empty")
    @GetMapping("{id}/houses")
    public ResponseEntity<List<House>> getHousesByClient(@PathVariable("id") long id) {
        List<House> houses = clientService.getHousesByClient(id);
        return new ResponseEntity<>(houses, houses.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @Operation(summary = "Edit Device by id")
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Device not found")
    @PutMapping("{id}")
    public ResponseEntity<Client> updateDevice(@PathVariable("id") long id, @RequestBody Client client) {
        client.setClientId(id);
        Client updatedClient = clientService.updateClient(client);
        return new ResponseEntity<>(updatedClient, updatedClient != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Delete a client by id (including their respective houses and devices)")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") Long ClientId) {
        Client client = clientService.getClient(ClientId);

        // Delete associated houses
        client.getHouses().forEach(house -> {
            // Delete associated devices
            house.getDevices().forEach(device -> deviceService.deleteDevice(device.getDeviceId()));
            houseService.deleteHouse(house.getHouseId());
        });
        clientService.deleteClient(ClientId);
        return new ResponseEntity<>("Client successfully deleted!", HttpStatus.OK);
    }
}
