package com.example.employeemanagement.security.authenticationhandlers;

import com.example.employeemanagement.appuser.AppUser;
import com.example.employeemanagement.appuser.UserRole;
import com.example.employeemanagement.member.MemberService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalTime;

@Component
@Slf4j
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final MemberService memberService;

    public CustomLoginSuccessHandler(MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
         Object principal = authentication.getPrincipal();
         if(principal instanceof AppUser) {
             AppUser loggedInUser = (AppUser) principal;
             if(loggedInUser.getRole() == UserRole.MEMBER){
                 memberService.updateLastLoginTime(loggedInUser.getUserId(), LocalTime.now());
                 memberService.updateLastLogoutTime(loggedInUser.getUserId(), null);
             }
             log.info("Login succesful!");
             response.setStatus(HttpServletResponse.SC_OK);
             response.setContentType("application/json");
             response.setCharacterEncoding("UTF-8");
             String jsonResponse = String.format(
                     "{\"message\": \"Login successful\", \"userId\": %d, \"role\": \"%s\"}",
                    loggedInUser.getUserId(), loggedInUser.getRole()
             );

             response.getWriter().write(jsonResponse);
             log.info("Sent response!");
         } else {
             log.info("Login failed!");
             response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid login");
         }
    }
}
