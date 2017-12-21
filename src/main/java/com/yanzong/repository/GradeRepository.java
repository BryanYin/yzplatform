package com.yanzong.repository;

import com.yanzong.domain.Grade;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Grade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {

}
