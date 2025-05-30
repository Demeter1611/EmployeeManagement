package com.example.employeemanagement.member;

import com.example.employeemanagement.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUserId(Long userId);

    @Query("SELECT u FROM AppUser u LEFT JOIN Member m ON u.userId = m.userId WHERE m.loginTime IS NOT NULL AND m.logoutTime IS NULL")
    List<AppUser> findLoggedInMembers();
}
