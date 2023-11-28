package pt.ua.deti.ies.SmartHomes.backend.Database;

import lombok.AllArgsConstructor;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("Clients")
public class ClientController {

    private ClientService ClientService;

    @PostMapping
    public ResponseEntity<Client> createMovei(@RequestBody Client Client){
        Client savedClient = ClientService.createClient(Client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Client> getClientByName(String name){
        Client Client = ClientService.getClient(name);
        return new ResponseEntity<>(Client, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") Long ClientId){
        ClientService.deleteClient(ClientId);
        return new ResponseEntity<>("Client successfully deleted!", HttpStatus.OK);
    }

}
