package pt.ua.deti.ies.SmartHomes.backend.Devices;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByHouseHouseId(long houseId);
}
