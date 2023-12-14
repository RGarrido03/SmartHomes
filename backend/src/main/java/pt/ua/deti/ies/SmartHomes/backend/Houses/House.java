package pt.ua.deti.ies.SmartHomes.backend.Houses;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.ua.deti.ies.SmartHomes.backend.Clients.Client;
import pt.ua.deti.ies.SmartHomes.backend.Devices.Device;

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
    @Column(name = "house_id")
    private long houseId;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @NotBlank(message = "House name is mandatory")
    private String name;

    @NotBlank(message = "House location is mandatory")
    private String location;

    @OneToMany(mappedBy = "house", fetch = FetchType.EAGER)
    private List<Device> devices;
}
