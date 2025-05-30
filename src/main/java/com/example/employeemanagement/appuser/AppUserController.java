package com.example.employeemanagement.appuser;

import com.example.employeemanagement.notification.Notification;
import com.example.employeemanagement.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class AppUserController {
    private AppUserService appUserService;

    @Autowired
    AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<AppUser> getAll() {
        return appUserService.getAllUsers();
    }
}
