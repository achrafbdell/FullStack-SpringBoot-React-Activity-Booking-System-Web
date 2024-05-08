package com.emsi.Site_de_Reservation.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

import java.sql.Blob;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Date date;
    private String city;
    private int duration_time;
    private double price;
    @Lob
    private Blob image;
    @ManyToMany(mappedBy = "activities")
    private Set<User> users = new HashSet<>();

}
