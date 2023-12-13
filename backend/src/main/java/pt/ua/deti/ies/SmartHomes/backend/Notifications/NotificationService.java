package pt.ua.deti.ies.SmartHomes.backend.Notifications;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import pt.ua.deti.ies.SmartHomes.backend.Houses.House;
import pt.ua.deti.ies.SmartHomes.backend.Houses.HouseService;

public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private HouseService houseService;

    public List<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }

    public Notification saveNotification(Notification notification){
        return notificationRepository.save(notification);
    }

    public List<Notification> geNotificationByHouse(House house){
        return notificationRepository.getNotificationsByHouse(house);
    }

    public String deleteNotificationById(Integer id){
        notificationRepository.deleteById(id);
        return "Notification " + id + " deleted!";
    }

    public Notification geNotificationById(Integer id){
        return notificationRepository.findById(id).orElseThrow();
    }

    public int getNumberOfNotificationByHouse(House house){
        return notificationRepository.getNotificationsByHouse(house).size();
    }

    public void removeOldestNotificationFromHouse(Integer houseId, Integer numberOfNotificationsToKeep){
        List<Notification> notifications = notificationRepository.getNotificationsByHouse(houseService.getHouse(houseId));
        if(notifications.size() > numberOfNotificationsToKeep) {
            for(int i=0; i<notifications.size()-numberOfNotificationsToKeep; i++){
                notificationRepository.deleteById((int) notifications.get(i).getId());
            }
        }
    }
}
