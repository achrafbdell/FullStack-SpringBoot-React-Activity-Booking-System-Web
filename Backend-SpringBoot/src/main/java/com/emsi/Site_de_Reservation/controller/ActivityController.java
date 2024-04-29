package com.emsi.Site_de_Reservation.controller;

import com.emsi.Site_de_Reservation.model.Activity;
import com.emsi.Site_de_Reservation.repository.ActivityRepository;
import com.emsi.Site_de_Reservation.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Date;

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
                                                 @RequestParam("date") Date date,
                                                 @RequestParam("city") String city,
                                                 @RequestParam("duration_time") int duration_time,
                                                 @RequestParam("price") double price,
                                                 @RequestParam("image") MultipartFile image_file) throws IOException, SQLException {

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
    }
}
