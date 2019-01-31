package com.school.management.repository;

import com.school.management.domain.ClassName;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ClassName entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClassNameRepository extends JpaRepository<ClassName, Long> {

}
