package com.example.employeemanagement.member;

import com.example.employeemanagement.appuser.AppUser;
import com.example.employeemanagement.appuser.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;

import java.time.LocalTime;

@Entity
@PrimaryKeyJoinColumn(name = "user_id")
public class Member extends AppUser {
    private LocalTime loginTime;
    private LocalTime logoutTime;

    public Member() {
        super();
        setRole(UserRole.MEMBER);
    }

    public Member(String name, String email, String password, LocalTime loginTime, LocalTime logoutTime) {
        super(name, email, password, UserRole.MEMBER);
        this.loginTime = loginTime;
        this.logoutTime = logoutTime;
    }

    public LocalTime getLoginTime() {
        return loginTime;
    }
    public void setLoginTime(LocalTime loginTime) {
        this.loginTime = loginTime;
    }
    public LocalTime getLogoutTime() {
        return logoutTime;
    }
    public void setLogoutTime(LocalTime logoutTime) {
        this.logoutTime = logoutTime;
    }

    @Override
    public String toString() {
        return "Member["
                + "loginTime= " + loginTime
                + ", logoutTime= " + logoutTime
                + "] " + super.toString();
    }
}
