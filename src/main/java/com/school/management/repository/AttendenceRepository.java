package com.school.management.repository;

import com.school.management.domain.Attendence;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Attendence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendenceRepository extends JpaRepository<Attendence, Long> {

}
