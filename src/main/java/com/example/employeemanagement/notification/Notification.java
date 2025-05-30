package com.example.employeemanagement.notification;

import com.example.employeemanagement.appuser.AppUser;
import jakarta.persistence.*;

@Entity
public class Notification {
    @SequenceGenerator(
            name = "notification_sequence",
            sequenceName = "notification_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "notification_sequence"
    )
    private Long id;
    private String message;
    private Boolean read = false;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser assignedUser;

    public Notification(){}

    public Notification(String message, Boolean read, AppUser assignedUser){
        this.message = message;
        this.read = read;
        this.assignedUser = assignedUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public AppUser getAssignedUser() {
        return assignedUser;
    }

    public void setAssignedUser(AppUser assignedUser) {
        this.assignedUser = assignedUser;
    }

    @Override
    public String toString() {
        return "Notification ["
                + "id= " + id
                + ", message= " + message
                + ", read= " + read
                + ", assignedUser= " + assignedUser;
    }
}
