package com.emsi.Site_de_Reservation.DTO;

import com.emsi.Site_de_Reservation.model.Role;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private byte[] userAvatar;
    private byte[] userCover;
    private Role role;
}

