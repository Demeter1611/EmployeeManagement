package com.example.employeemanagement.notification;

import com.example.employeemanagement.appuser.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class NotificationController {
    @Autowired
    NotificationService notificationService;

    @PutMapping("/api/notification/mark-as-read")
    public ResponseEntity<?> markNotificationRead(@RequestParam Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok("Notification " + notificationId + " marked as read");
    }

    @GetMapping("/api/notification/get-all")
    public List<Notification> getUnreadNotifications(Authentication authentication) {
        AppUser currentUser = (AppUser) authentication.getPrincipal();
        return notificationService.getAllUnreadNotificationsOfUser(currentUser);
    }
}
