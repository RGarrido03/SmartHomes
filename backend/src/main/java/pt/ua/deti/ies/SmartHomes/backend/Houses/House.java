package pt.ua.deti.ies.SmartHomes.backend.Houses;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.ua.deti.ies.SmartHomes.backend.Clients.Client;
import pt.ua.deti.ies.SmartHomes.backend.Devices.Device;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "House")
@NoArgsConstructor
@AllArgsConstructor
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long houseId;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @NotBlank(message = "House name is mandatory")
    private String name;

    @NotBlank(message = "House location is mandatory")
    private String location;

    @OneToMany(mappedBy = "house")
    private List<Device> devices;
}
