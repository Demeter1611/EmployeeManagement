package com.example.employeemanagement.notification;

import com.example.employeemanagement.appuser.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public void markAsRead(Long notificationId) {
        Optional<Notification> notificationOptional = notificationRepository.findById(notificationId);
        if (notificationOptional.isEmpty()){
            throw new IllegalStateException("Notification with id " + notificationId + " not found");
        }
        Notification notification = notificationOptional.get();
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public List<Notification> getAllUnreadNotificationsOfUser(AppUser user) {
        return notificationRepository.findByAssignedUserAndReadFalse(user);
    }

    public void sendNotification(String message, List<? extends AppUser> users) {
        List<Notification> notifications = new ArrayList<>();
        for(AppUser user : users) {
            notifications.add(new Notification(message, false, user));
        }
        notificationRepository.saveAll(notifications);
    }
}
