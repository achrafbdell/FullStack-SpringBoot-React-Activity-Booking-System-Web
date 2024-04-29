package com.emsi.Site_de_Reservation.repository;

import com.emsi.Site_de_Reservation.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

}
