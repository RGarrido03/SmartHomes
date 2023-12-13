package pt.ua.deti.ies.SmartHomes.backend.Notifications;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.SmartHomes.backend.Houses.House;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> getNotificationsByHouse(House house);
}
