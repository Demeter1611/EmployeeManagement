package com.example.employeemanagement.member;


import com.example.employeemanagement.appuser.AppUser;
import com.example.employeemanagement.task.Task;
import com.example.employeemanagement.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping
public class MemberController {
    private MemberService memberService;
    private TaskService taskService;

    @Autowired
    public MemberController(MemberService memberService, TaskService taskService) {
        this.memberService = memberService;
        this.taskService = taskService;
    }

    @GetMapping("/api/member/tasks")
    public Collection<Task> getTasks(Authentication authentication) {
        AppUser currentUser = (AppUser) authentication.getPrincipal();
        return taskService.getTasksOfMember(currentUser.getUserId());
    }

    @PutMapping("/api/member/mark-task-finished")
    public ResponseEntity<?> markTaskAsFinished(@RequestParam Long taskId) {
        taskService.finishTask(taskId);
        return ResponseEntity.ok("Task " + taskId + " marked successfully.");
    }
}
