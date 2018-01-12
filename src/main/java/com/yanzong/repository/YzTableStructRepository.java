package com.yanzong.repository;

import com.yanzong.domain.YzTableStruct;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the YzTableStruct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YzTableStructRepository extends JpaRepository<YzTableStruct, Long> {

}
