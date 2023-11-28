package pt.ua.deti.ies.SmartHomes.backend.Database;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;
    
    @Override
    public Client createClient(Client client) {
        return clientRepository.createClient();
    }

    @Override
    public Client getClient(String client_name) {
        return clientRepository.findByName(client_name);
    }

    @Override
    public Client updateClient(Client client) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateClient'");
    }

    @Override
    public void deleteClient(Long clientId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteClient'");
    }

    

}
