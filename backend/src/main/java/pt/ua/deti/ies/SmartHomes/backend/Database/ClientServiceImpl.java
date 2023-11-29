package pt.ua.deti.ies.SmartHomes.backend.Database;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Client createClient(Client client) {
        client.setPassword(bCryptPasswordEncoder.encode(client.getPassword()));
        return clientRepository.save(client);
    }

    @Override
    public Client getClient(String clientName) {
        return clientRepository.findByName(clientName);
    }

    @Override
    public Client updateClient(Client client) {
        client.setPassword(bCryptPasswordEncoder.encode(client.getPassword()));
        return clientRepository.save(client);
    }

    @Override
    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }
}
