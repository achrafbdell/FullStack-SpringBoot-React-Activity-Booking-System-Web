package com.emsi.Site_de_Reservation.controller;

import com.emsi.Site_de_Reservation.DTO.UserDTO;
import com.emsi.Site_de_Reservation.DTO.UserManageDTO;
import com.emsi.Site_de_Reservation.DTO.UserUpdateDTO;
import com.emsi.Site_de_Reservation.model.Activity;
import com.emsi.Site_de_Reservation.model.Role;
import com.emsi.Site_de_Reservation.model.User;
import com.emsi.Site_de_Reservation.repository.ActivityRepository;
import com.emsi.Site_de_Reservation.repository.UserRepository;
import com.emsi.Site_de_Reservation.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class UserController {
    @Autowired
    private final UserService userService;
    private final UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private final ActivityRepository activityRepository;

    public UserController(UserService userService, UserRepository userRepository, ActivityRepository activityRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
    }

    @PostMapping("/user/register")
    public ResponseEntity<String> createUser(HttpServletRequest request,
                                             @RequestParam("first_name") String first_name,
                                             @RequestParam("last_name") String last_name,
                                             @RequestParam("username") String username,
                                             @RequestParam("email") String email,
                                             @RequestParam("password") String password,
                                             @RequestParam("user_avatar") MultipartFile user_avatar_file,
                                             @RequestParam("user_cover") MultipartFile user_cover_file,
                                             @RequestParam(value = "role", defaultValue = "USER") Role role) throws IOException, SQLException {

        // Vérifier si le nom d'utilisateur existe déjà
        if (userService.existsByUsername(username)) {
            return ResponseEntity.badRequest().body("Username déjà utilisé !");
        }

        // Vérifier si l'e-mail existe déjà
        if (userService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("E-mail déjà utilisé !");
        }
        // Convertion du user avatar en bytes
        byte[] avatar_bytes = user_avatar_file.getBytes();
        Blob avatar_blob = new javax.sql.rowset.serial.SerialBlob(avatar_bytes);

        // Convertion du user cover en bytes
        byte[] cover_bytes = user_cover_file.getBytes();
        Blob cover_blob = new javax.sql.rowset.serial.SerialBlob(cover_bytes);

        User user = new User();
        user.setFirst_name(first_name);
        user.setLast_name(last_name);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setUser_avatar(avatar_blob);
        user.setUser_cover(cover_blob);
        user.setRole(role);
        userService.createUser(user);
        return ResponseEntity.ok("Compte créer avec succées :)");
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO updatedUser) {
        String hashedPassword = passwordEncoder.encode(updatedUser.getPassword());

        return userRepository.findById(id)

                .map(user -> {
                    user.setFirst_name(updatedUser.getFirstName());
                    user.setLast_name(updatedUser.getLastName());
                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    user.setPassword(hashedPassword);

                    User savedUser = userRepository.save(user);
                    return ResponseEntity.ok().body(savedUser);

                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = Optional.ofNullable(userService.getUserById(id));
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try {
            User user = userOptional.get();
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setFirstName(user.getFirst_name());
            userDTO.setLastName(user.getLast_name());
            userDTO.setUsername(user.getUsername());
            userDTO.setEmail(user.getEmail());
            userDTO.setUserAvatar(blobToByteArray(user.getUser_avatar()));
            userDTO.setUserCover(blobToByteArray(user.getUser_cover()));
            userDTO.setRole(user.getRole());

            return ResponseEntity.ok(userDTO);
        } catch (SQLException | IOException e) {
            e.printStackTrace();  // Handle or log the exception as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private byte[] blobToByteArray(Blob blob) throws SQLException, IOException {
        if (blob == null) {
            return null;
        }

        try (InputStream inputStream = blob.getBinaryStream();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            return outputStream.toByteArray();
        }
    }

    @GetMapping("/users")
    public String showUsers(Model model) {
        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);
        return "users";
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserManageDTO>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserManageDTO> userDTOs = users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.delete(optionalUser.get());
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    private UserManageDTO convertToDTO(User user) {
        return UserManageDTO.builder()
                .id(user.getId())
                .firstName(user.getFirst_name())
                .lastName(user.getLast_name())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }

}
   /* @PostMapping("/user/{userId}/book/activity/{activityId}")
    public ResponseEntity<String> bookActivity(
            @PathVariable Long userId,
            @PathVariable Long activityId,
            @RequestParam String username,
            @RequestParam String password
    ) {
        // Vérifier l'authentification de l'utilisateur ici (par exemple, via un service d'authentification)
        // Si l'authentification réussit, continuer avec la réservation
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + activityId));

        // Vérifier si l'utilisateur a déjà réservé cette activité
        if (user.getActivities().contains(activity)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already reserved this activity.");
        }

        // Ajouter l'activité à la liste des activités de l'utilisateur
        user.getActivities().add(activity);
        userRepository.save(user);
        return ResponseEntity.ok("Activity reserved successfully.");
    } */
    /*
    @PostMapping(value = "/loginnnn", consumes = "application/json")
    public User loginUUser(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        return user;

        try {
            Optional<User> foundUser = userService.findByUsername(username);

            if (foundUser.isPresent()) {
                // Récupérer le mot de passe hashé de l'utilisateur trouvé
                String hashedPassword = foundUser.get().getPassword();

                // Vérifier si le mot de passe entré correspond au mot de passe hashé
                if (passwordEncoder.matches(password, hashedPassword)) {
                    // Authentification réussie
                    String token = jwtUtil.generateToken(user.getUsername());
                    System.out.println("Token généré : " + token);

                    // Récupérer l'utilisateur avec toutes ses informations
                    User loggedInUser = foundUser.get();

                    return ResponseEntity.ok(loggedInUser);
                } else {
                    // Mot de passe incorrect
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
                }
            } else {
                // Utilisateur non trouvé
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
            }
        } catch (Exception e) {
            // Gérer toute exception interne
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne du serveur");
        }
        */

  /*  @GetMapping("/profile")
    public ResponseEntity<String> userProfile(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            String authToken = token.substring(7);
            if (jwtUtil.validateToken(authToken)) {
                String username = jwtUtil.getUsernameFromToken(authToken);
                boolean isAdmin = jwtUtil.isAdminFromToken(authToken);
                // Your logic to fetch and return user profile data
                return ResponseEntity.ok("User profile data for: " + username);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization header missing");
        }
    }
}
*/