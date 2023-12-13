package pt.ua.deti.ies.SmartHomes.backend.Notifications;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class NotificationMessage {
    @NotEmpty
    private long id;

    @NotEmpty
    private String message;

    @NotEmpty
    private NotificationTypeEnum notificationType;
}
