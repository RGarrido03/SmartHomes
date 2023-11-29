package pt.ua.deti.ies.SmartHomes.backend.LoginAndRegister;


import pt.ua.deti.ies.SmartHomes.backend.Database.Client;

public interface ClientService {
    Client save(Client client);
    Client findByUsername(String username);
}
