package pt.ua.deti.ies.SmartHomes.backend.Security;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.SmartHomes.backend.Clients.Client;
import pt.ua.deti.ies.SmartHomes.backend.Clients.ClientRepository;
import pt.ua.deti.ies.SmartHomes.backend.Devices.DeviceController;
import pt.ua.deti.ies.SmartHomes.backend.Security.Payloads.JwtResponse;
import pt.ua.deti.ies.SmartHomes.backend.Security.Payloads.LoginRequest;
import pt.ua.deti.ies.SmartHomes.backend.Security.Payloads.MessageResponse;

import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestControllerAdvice
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

    @Operation(summary = "Validate login of a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = AuthController.class)) }),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content) })
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
        Long expires = jwtUtils.getDateFromJwtToken(jwt).getTime();

        Client userDetails = (Client) authentication.getPrincipal();

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getClientId(), expires, userDetails.getName(), userDetails.getUsername(), userDetails.getEmail()));
    }

    @Operation(summary = "Creation of a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "New user registered",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = AuthController.class)) }),
            @ApiResponse(responseCode = "404", description = "User already exists",
                    content = @Content) })
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
        Long expires = jwtUtils.getDateFromJwtToken(jwt).getTime();

        Client userDetails = (Client) authentication.getPrincipal();

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getClientId(), expires, userDetails.getName(), userDetails.getUsername(), userDetails.getEmail()));
    }
}
