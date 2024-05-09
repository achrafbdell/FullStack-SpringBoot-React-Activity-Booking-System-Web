package com.emsi.Site_de_Reservation.DTO;

import lombok.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDTO {
        private Long id;
        private String title;
        private String description;
        private Date date;
        private String city;
        private int duration_time;
        private double price;
}
