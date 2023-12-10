package pt.ua.deti.ies.SmartHomes.backend.Houses;

import java.util.List;

public interface HouseService {
    House createHouse(House house);
    House getHouse(long id);
    House updateHouse(House house);
    void deleteHouse(long id);
    List<House> getAllHouses();
}
