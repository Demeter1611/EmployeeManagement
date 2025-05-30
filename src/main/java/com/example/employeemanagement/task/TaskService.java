package com.example.employeemanagement.task;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Collection<Task> getTasksOfMember(Long userId){
        return taskRepository.findByAssignedMember_UserId(userId);
    }

    @Transactional
    public void finishTask(Long taskId){
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if(taskOptional.isEmpty()){
            throw new IllegalStateException("Task not found");
        }
        Task task = taskOptional.get();
        task.setFinished(true);
        taskRepository.save(task);
    }

    public void createTask(Task task){
        taskRepository.save(task);
    }
}
