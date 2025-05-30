package com.example.employeemanagement.member;


import com.example.employeemanagement.appuser.AppUser;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;
    public MemberService(MemberRepository employeeRepository) {
        this.memberRepository = employeeRepository;
    }

    public Member getById(Long userId){
        Optional<Member> memberOptional = memberRepository.findByUserId(userId);
        if(memberOptional.isEmpty()){
            throw new IllegalArgumentException("Member not found");
        }
        return memberOptional.get();
    }

    @Transactional
    public void updateLastLoginTime(Long userId, LocalTime lastLoginTime) {
        Optional<Member> memberOptional = memberRepository.findByUserId(userId);
        memberOptional.ifPresent(member -> {
            member.setLoginTime(lastLoginTime);
            memberRepository.save(member);
        });
    }

    @Transactional
    public void updateLastLogoutTime(Long userId, LocalTime lastLogoutTime) {
        Optional<Member> memberOptional = memberRepository.findByUserId(userId);
        memberOptional.ifPresent(member -> {
            member.setLogoutTime(lastLogoutTime);
            memberRepository.save(member);
        });
    }

    public List<AppUser> getLoggedInMembers(){
        return memberRepository.findLoggedInMembers();
    }
}
