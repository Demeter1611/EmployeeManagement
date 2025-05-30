package com.example.employeemanagement.manager;

import com.example.employeemanagement.appuser.AppUser;
import com.example.employeemanagement.member.MemberService;
import com.example.employeemanagement.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ManagerController {
    private ManagerService managerService;
    private MemberService memberService;

    @Autowired
    public ManagerController(ManagerService managerService, MemberService memberService) {
        this.managerService = managerService;
        this.memberService = memberService;
    }

    @PostMapping("api/manager/assigntask")
    public void assignTask(@RequestParam String description, @RequestParam Long memberId){
        Task task = new Task();
        task.setDescription(description);
        task.setFinished(false);
        managerService.assignTaskToMemberAndNotify(task, memberService.getById(memberId));
    }

    @GetMapping("api/manager/logged-in-members")
    public List<AppUser> getLoggedInMembers(){
        return memberService.getLoggedInMembers();
    }
}
