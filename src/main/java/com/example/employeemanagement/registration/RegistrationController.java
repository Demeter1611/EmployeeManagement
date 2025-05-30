package com.example.employeemanagement.registration;

import com.example.employeemanagement.appuser.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CONFLICT;

@RestController
@RequestMapping("/register")
public class RegistrationController {
    @Autowired
    private final AppUserService appUserService;

    public RegistrationController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        try{
            appUserService.registerNewUser(registrationRequest);
            return ResponseEntity.ok("User registered successfully");
        }
        catch(Exception e){
            return ResponseEntity.status(CONFLICT).body(e.getMessage());
        }
    }
}
