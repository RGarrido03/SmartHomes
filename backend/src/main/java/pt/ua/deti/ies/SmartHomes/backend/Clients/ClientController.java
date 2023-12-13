package pt.ua.deti.ies.SmartHomes.backend.Clients;

import lombok.AllArgsConstructor;

import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.SmartHomes.backend.Houses.House;

@RestController
@AllArgsConstructor
@RequestMapping("api/clients")
public class ClientController {

    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.findAll();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client Client) {
        Client savedClient = clientService.createClient(Client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Client> getClient(@PathVariable("id") long id) {
        Client client = clientService.getClient(id);
        return new ResponseEntity<>(client, client != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("{id}/houses")
    public ResponseEntity<List<House>> getHousesByClient(@PathVariable("id") long id) {
        List<House> houses = clientService.getHousesByClient(id);
        return new ResponseEntity<>(houses, houses.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Client> updateDevice(@PathVariable("id") long id, @RequestBody Client client) {
        client.setClientId(id);
        Client updatedClient = clientService.updateClient(client);
        return new ResponseEntity<>(updatedClient, updatedClient != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") Long ClientId) {
        clientService.deleteClient(ClientId);
        return new ResponseEntity<>("Client successfully deleted!", HttpStatus.OK);
    }
}
