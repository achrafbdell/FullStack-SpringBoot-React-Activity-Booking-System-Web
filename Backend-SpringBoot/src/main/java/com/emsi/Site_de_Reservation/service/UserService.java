package com.emsi.Site_de_Reservation.service;

import com.emsi.Site_de_Reservation.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    void createUser(User user);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
    User getUserById(Long id);
    List<User> getAllUsers();
}
