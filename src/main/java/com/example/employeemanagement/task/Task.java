package com.example.employeemanagement.task;

import com.example.employeemanagement.member.Member;
import jakarta.persistence.*;

@Entity
public class Task {
    @SequenceGenerator(
            name = "task_sequence",
            sequenceName = "task_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "task_sequence"
    )
    private Long id;
    private String description;
    private Boolean finished = false;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member assignedMember;

    public Task(){}

    public Task(String description, Boolean finished, Member assignedMember) {
        this.description = description;
        this.finished = finished;
        this.assignedMember = assignedMember;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public Boolean getFinished(){
        return finished;
    }

    public void setFinished(Boolean finished){
        this.finished = finished;
    }

    public Member getAssignedMember(){
        return assignedMember;
    }

    public void setAssignedMember(Member assignedMember){
        this.assignedMember = assignedMember;
    }

    @Override
    public String toString(){
        return "Task [" +
                "id= " + id
                + ", description= " + description
                + ", finished= " + finished
                + (assignedMember != null ? ", assignedMember= " + assignedMember.getUserId() : "") + "]";
    }
}
