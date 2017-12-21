package com.yanzong.service;

import com.yanzong.domain.Grade;
import com.yanzong.repository.GradeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Grade.
 */
@Service
@Transactional
public class GradeService {

    private final Logger log = LoggerFactory.getLogger(GradeService.class);

    private final GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    /**
     * Save a grade.
     *
     * @param grade the entity to save
     * @return the persisted entity
     */
    public Grade save(Grade grade) {
        log.debug("Request to save Grade : {}", grade);
        return gradeRepository.save(grade);
    }

    /**
     * Get all the grades.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Grade> findAll() {
        log.debug("Request to get all Grades");
        return gradeRepository.findAll();
    }

    /**
     * Get one grade by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Grade findOne(Long id) {
        log.debug("Request to get Grade : {}", id);
        return gradeRepository.findOne(id);
    }

    /**
     * Delete the grade by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Grade : {}", id);
        gradeRepository.delete(id);
    }
}
