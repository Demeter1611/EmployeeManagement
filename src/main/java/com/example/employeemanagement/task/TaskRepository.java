package com.example.employeemanagement.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    public List<Task> findByAssignedMember_UserId(long userId);
    public Task findById(long id);
}
