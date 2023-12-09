package pt.ua.deti.ies.SmartHomes.backend.Clients;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("service/Clients")
public class ClientController {

    private ClientService clientService;

    @GetMapping("all")
    public ResponseEntity<List<String>> getAllMovies(){
        List<String> names = new ArrayList<>();
        for (Client m: clientService.findAll()) {
            names.add(m.getName());
        }
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Client> createCliEntity(@RequestBody Client Client){
        Client savedClient = clientService.createClient(Client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Client> getClientByName(String name){
        Client Client = clientService.getClient(name);
        return new ResponseEntity<>(Client, HttpStatus.OK);
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
    public ResponseEntity<String> deleteClient(@PathVariable("id") Long ClientId){
        clientService.deleteClient(ClientId);
        return new ResponseEntity<>("Client successfully deleted!", HttpStatus.OK);
    }

}
