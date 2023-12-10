package pt.ua.deti.ies.SmartHomes.backend.Clients;

import pt.ua.deti.ies.SmartHomes.backend.Houses.House;

import java.util.List;

public interface ClientService {

    Client createClient(Client client);
    Client getClient(long id);
    Client getClientByUsername(String username);
    Client updateClient(Client client);
    void deleteClient(Long clientId);
    List<Client> findAll();
    List<House> getHousesByClient(long id);
}
