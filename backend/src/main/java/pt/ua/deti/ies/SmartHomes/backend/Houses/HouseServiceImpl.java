package pt.ua.deti.ies.SmartHomes.backend.Houses;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class HouseServiceImpl implements HouseService {
    private HouseRepository houseRepository;

    @Override
    public House createHouse(House house) {
        return houseRepository.save(house);
    }

    @Override
    public House getHouse(long id) {
        return houseRepository.findById(id).orElse(null);
    }

    @Override
    public House updateHouse(House house) {
        Optional<House> existingOpt = houseRepository.findById(house.getHouseId());

        if (existingOpt.isPresent()) {
            House existing = existingOpt.get();
            existing.setClient(house.getClient());
            existing.setName(house.getName());
            existing.setLocation(house.getLocation());
            existing.setDevices(house.getDevices());
            return houseRepository.save(existing);
        } else {
            return null;
        }
    }

    @Override
    public void deleteHouse(long id) {
        houseRepository.deleteById(id);
    }

    @Override
    public List<House> getAllHouses() {
        return houseRepository.findAll();
    }
}
