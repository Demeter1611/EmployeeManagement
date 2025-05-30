package com.example.employeemanagement.manager;

import com.example.employeemanagement.member.Member;
import com.example.employeemanagement.notification.NotificationService;
import com.example.employeemanagement.task.Task;
import com.example.employeemanagement.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ManagerService {
    private ManagerRepository managerRepository;
    private TaskService taskService;
    private NotificationService notificationService;

    @Autowired
    ManagerService(ManagerRepository managerRepository, TaskService taskService, NotificationService notificationService) {
        this.managerRepository = managerRepository;
        this.taskService = taskService;
        this.notificationService = notificationService;
    }

    public void assignTaskToMemberAndNotify(Task task, Member member) {
        task.setAssignedMember(member);
        taskService.createTask(task);
        notificationService.sendNotification("New task assigned!", Collections.singletonList(member));
    }

    public List<Manager> getAllManagers(){
        return managerRepository.findAll();
    }
}
