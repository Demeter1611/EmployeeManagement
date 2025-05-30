package com.example.employeemanagement.security.authenticationhandlers;

import com.example.employeemanagement.appuser.AppUser;
import com.example.employeemanagement.appuser.AppUserService;
import com.example.employeemanagement.appuser.UserRole;
import com.example.employeemanagement.manager.Manager;
import com.example.employeemanagement.manager.ManagerService;
import com.example.employeemanagement.member.MemberService;
import com.example.employeemanagement.notification.NotificationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalTime;
import java.util.List;

@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
    private MemberService memberService;
    private NotificationService notificationService;
    private ManagerService managerService;

    @Autowired
    CustomLogoutSuccessHandler(MemberService memberService, NotificationService notificationService, ManagerService managerService) {
        this.memberService = memberService;
        this.notificationService = notificationService;
        this.managerService = managerService;
    }

    public CustomLogoutSuccessHandler(MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        if(principal instanceof AppUser){
            AppUser loggedInUser = (AppUser) principal;
            if(loggedInUser.getRole() == UserRole.MEMBER){
                memberService.updateLastLogoutTime(loggedInUser.getUserId(), LocalTime.now());
                List<Manager> listOfManagers = managerService.getAllManagers();
                notificationService.sendNotification("User " + loggedInUser.getEmail() + " has logged out", listOfManagers);
            }
        }
        response.sendRedirect("/login");
    }
}
