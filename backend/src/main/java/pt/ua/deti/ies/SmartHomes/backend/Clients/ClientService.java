package pt.ua.deti.ies.SmartHomes.backend.Clients;

import org.springframework.security.core.userdetails.UserDetailsService;
import pt.ua.deti.ies.SmartHomes.backend.Houses.House;

import java.util.List;

public interface ClientService extends UserDetailsService {

    Client createClient(Client client);
    Client getClient(long id);
    Client updateClient(Client client);
    void deleteClient(Long clientId);
    List<Client> findAll();
    List<House> getHousesByClient(long id);
}
