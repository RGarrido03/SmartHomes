package pt.ua.deti.ies.SmartHomes.backend.Security.Payloads;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private Date expires;
    private String name;
    private String username;
    private String email;

    public JwtResponse(String accessToken, Long id, Date expires, String name, String username, String email) {
        this.token = accessToken;
        this.id = id;
        this.expires = expires;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}