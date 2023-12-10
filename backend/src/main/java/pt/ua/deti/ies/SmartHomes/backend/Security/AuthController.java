package pt.ua.deti.ies.SmartHomes.backend.Security;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pt.ua.deti.ies.SmartHomes.backend.Clients.Client;
import pt.ua.deti.ies.SmartHomes.backend.Clients.ClientRepository;
import pt.ua.deti.ies.SmartHomes.backend.Security.Payloads.JwtResponse;
import pt.ua.deti.ies.SmartHomes.backend.Security.Payloads.LoginRequest;
import pt.ua.deti.ies.SmartHomes.backend.Security.Payloads.MessageResponse;

import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/authentication")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateClient(@Valid @RequestBody LoginRequest loginRequest) {
        Client client = clientRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (client == null) {
            return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.UNAUTHORIZED);
        }

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(client.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        Date expires = jwtUtils.getDateFromJwtToken(jwt);

        Client userDetails = (Client) authentication.getPrincipal();

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getClientId(), expires, userDetails.getName(), userDetails.getUsername(), userDetails.getEmail()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@Valid @RequestBody Client client) {
        if (clientRepository.existsByUsername(client.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken"));
        }

        if (clientRepository.existsByEmail(client.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("E-mail is already in use"));
        }

        String unencryptedPassword = client.getPassword();

        client.setPassword(encoder.encode(client.getPassword()));
        clientRepository.save(client);

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(client.getUsername(), unencryptedPassword));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        Date expires = jwtUtils.getDateFromJwtToken(jwt);

        Client userDetails = (Client) authentication.getPrincipal();

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getClientId(), expires, userDetails.getName(), userDetails.getUsername(), userDetails.getEmail()));
    }
}
