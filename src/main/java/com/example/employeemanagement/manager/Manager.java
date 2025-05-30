package com.example.employeemanagement.manager;

import com.example.employeemanagement.appuser.AppUser;
import com.example.employeemanagement.appuser.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "user_id")
public class Manager extends AppUser {
    public Manager(){
        super();
        setRole(UserRole.MANAGER);
    }

    public Manager(String name, String email, String password) {
        super(name, email, password, UserRole.MANAGER);
    }

    @Override
    public String toString(){
        return "Manager[] " + super.toString();
    }
}
