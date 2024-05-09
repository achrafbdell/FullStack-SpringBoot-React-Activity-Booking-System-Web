package com.emsi.Site_de_Reservation.controller;

import com.emsi.Site_de_Reservation.DTO.ActivityDTO;
import com.emsi.Site_de_Reservation.DTO.UserDTO;
import com.emsi.Site_de_Reservation.model.Activity;
import com.emsi.Site_de_Reservation.model.User;
import com.emsi.Site_de_Reservation.repository.ActivityRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ActivityController {

    @Autowired
    private final ActivityRepository activityRepository;

    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @PostMapping("/add/activity")
    public ResponseEntity<String> createActivity(HttpServletRequest request,
                                                 @RequestParam("title") String title,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("date") String dateString,
                                                 @RequestParam("city") String city,
                                                 @RequestParam("duration_time") int duration_time,
                                                 @RequestParam("price") double price,
                                                 @RequestParam("image") MultipartFile image_file) throws IOException, SQLException {

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date date = dateFormat.parse(dateString);

            byte[] image_bytes = image_file.getBytes();
            Blob image_blob = new javax.sql.rowset.serial.SerialBlob(image_bytes);

            Activity activity = new Activity();
            activity.setTitle(title);
            activity.setDescription(description);
            activity.setDate(date);
            activity.setCity(city);
            activity.setDuration_time(duration_time);
            activity.setPrice(price);
            activity.setImage(image_blob);

            activityRepository.save(activity);
            return ResponseEntity.ok("Activité créer avec succées :)");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur lors de la création de l'activité");
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateActivity(@PathVariable Long id, @RequestBody ActivityDTO updatedActivityDTO) {
        Optional<Activity> activityOptional = activityRepository.findById(id);
        if (activityOptional.isPresent()) {
            Activity activity = activityOptional.get();
            activity.setTitle(updatedActivityDTO.getTitle());
            activity.setDescription(updatedActivityDTO.getDescription());
            activity.setDate(updatedActivityDTO.getDate());
            activity.setCity(updatedActivityDTO.getCity());
            activity.setDuration_time(updatedActivityDTO.getDuration_time());
            activity.setPrice(updatedActivityDTO.getPrice());
            activityRepository.save(activity);
            return ResponseEntity.ok("Activité mise à jour avec succès :)");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityDTO>> getAllActivities() {
        List<Activity> activities = activityRepository.findAll();

        // Map Activity entities to ActivityDTO objects
        List<ActivityDTO> activityDTOs = activities.stream()
                .map(activity -> ActivityDTO.builder()
                        .id(activity.getId())
                        .title(activity.getTitle())
                        .description(activity.getDescription())
                        .date(activity.getDate())
                        .city(activity.getCity())
                        .duration_time(activity.getDuration_time())
                        .price(activity.getPrice())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(activityDTOs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteActivity(@PathVariable Long id) {
        Optional<Activity> optionalActivity = activityRepository.findById(id);
        if (optionalActivity.isPresent()) {
            activityRepository.delete(optionalActivity.get());
            return new ResponseEntity<>("Activity deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Activity not found", HttpStatus.NOT_FOUND);
        }
    }





}
