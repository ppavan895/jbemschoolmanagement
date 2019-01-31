package com.school.management.repository;

import com.school.management.domain.Markes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Markes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarkesRepository extends JpaRepository<Markes, Long> {

}
