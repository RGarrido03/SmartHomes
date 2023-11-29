package pt.ua.deti.ies.SmartHomes.backend.LoginAndRegister;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import pt.ua.deti.ies.SmartHomes.backend.Database.Client;

@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Client> register(@RequestBody Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        Client savedClient = clientService.save(client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<Client> login(@RequestBody Client client) {
        Client existingClient = clientService.findByUsername(client.getUsername());
        if (existingClient != null && existingClient.getPassword().equals(client.getPassword())) {
            return new ResponseEntity<>(existingClient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
