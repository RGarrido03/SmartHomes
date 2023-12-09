package pt.ua.deti.ies.SmartHomes.backend.Clients;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import pt.ua.deti.ies.SmartHomes.backend.Houses.House;
import pt.ua.deti.ies.SmartHomes.backend.Houses.HouseRepository;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;
    private HouseRepository houseRepository;

    @Override
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client getClient(long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public Client updateClient(Client client) {
        Optional<Client> existingOpt = clientRepository.findById(client.getClientId());

        if (existingOpt.isPresent()) {
            Client existing = existingOpt.get();
            existing.setName(client.getName());
            existing.setEmail(client.getEmail());
            existing.setHouses(client.getHouses());
            existing.setUsername(client.getUsername());
            existing.setPassword(client.getPassword());
            return clientRepository.save(existing);
        } else {
            return null;
        }
    }

    @Override
    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    @Override
    public List<House> getHousesByClient(long id) {
        return houseRepository.findHousesByClientClientId(id);
    }
}
