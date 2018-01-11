package com.yanzong.repository;

import com.yanzong.domain.YzSchemaTable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the YzSchemaTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YzSchemaTableRepository extends JpaRepository<YzSchemaTable, Long> {

}
