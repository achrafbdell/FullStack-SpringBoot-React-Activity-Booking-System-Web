package com.emsi.Site_de_Reservation.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserManageDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
}
