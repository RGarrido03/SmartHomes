package pt.ua.deti.ies.SmartHomes.backend.Houses;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findHousesByClientClientId(long clientId);
}
