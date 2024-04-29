package com.emsi.Site_de_Reservation.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String first_name;
    private String last_name;
    @Column(unique = true, nullable = false)
    private String username;
    private String email;
    private String password;
    @Lob
    private Blob user_avatar;
    @Lob
    private Blob user_cover;
    @Enumerated(value = EnumType.STRING)
    private Role role;

    /*@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_activity", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "activity_id"))
    private Set<Activity> activities = new HashSet<>();*/
}
