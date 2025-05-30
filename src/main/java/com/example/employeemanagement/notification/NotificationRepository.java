package com.example.employeemanagement.notification;

import com.example.employeemanagement.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Optional<Notification> getNotificationById(long id);
    List<Notification> findByAssignedUserAndReadFalse(AppUser assignedUser);
}
