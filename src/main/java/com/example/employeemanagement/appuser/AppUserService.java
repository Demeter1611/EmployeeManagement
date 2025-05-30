package com.example.employeemanagement.appuser;

import com.example.employeemanagement.member.Member;
import com.example.employeemanagement.manager.Manager;
import com.example.employeemanagement.registration.RegistrationRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Attempting to load user by email: {}", email);
        Optional<AppUser> user = appUserRepository.findByEmail(email);
        if (user.isEmpty()) {
            log.info("User with email {} not found", email);
            throw new UsernameNotFoundException("User not found");
        }
        log.debug("User found: {}", user.get());
        return user.get();
    }

    public void registerNewUser(RegistrationRequest registrationRequest) throws Exception {
        if (appUserRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            throw new Exception("User with email " + registrationRequest.getEmail() + " already exists");
        }
        AppUser newUser;

        switch(registrationRequest.getRole()){
            case MEMBER -> {
                newUser = new Member();
            }
            case MANAGER -> {
                newUser = new Manager();
            }
            default -> {
                throw new Exception("Invalid role");
            }
        }

        newUser.setName(registrationRequest.getName());
        newUser.setEmail(registrationRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

        System.out.println("About to save user: " + newUser);
        appUserRepository.save(newUser);
    }

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }
}
