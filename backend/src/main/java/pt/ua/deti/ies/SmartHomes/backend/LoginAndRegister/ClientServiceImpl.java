package pt.ua.deti.ies.SmartHomes.backend.LoginAndRegister;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import pt.ua.deti.ies.SmartHomes.backend.Database.Client;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;

@Service
public class ClientServiceImpl implements ClientService, UserDetailsService {
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client save(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client findByUsername(String username) {
        return clientRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client client = findByUsername(username);
        if (client == null) {
            throw new UsernameNotFoundException("Client not found");
        }
        return new User(client.getUsername(), client.getPassword(), new ArrayList<>());
    }

}
