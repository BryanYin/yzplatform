package com.yanzong.service;

import com.yanzong.domain.YzTableStruct;
import com.yanzong.repository.YzTableStructRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing YzTableStruct.
 */
@Service
@Transactional
public class YzTableStructService {

    private final Logger log = LoggerFactory.getLogger(YzTableStructService.class);

    private final YzTableStructRepository yzTableStructRepository;

    public YzTableStructService(YzTableStructRepository yzTableStructRepository) {
        this.yzTableStructRepository = yzTableStructRepository;
    }

    /**
     * Save a yzTableStruct.
     *
     * @param yzTableStruct the entity to save
     * @return the persisted entity
     */
    public YzTableStruct save(YzTableStruct yzTableStruct) {
        log.debug("Request to save YzTableStruct : {}", yzTableStruct);
        return yzTableStructRepository.save(yzTableStruct);
    }

    /**
     * Get all the yzTableStructs.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<YzTableStruct> findAll() {
        log.debug("Request to get all YzTableStructs");
        return yzTableStructRepository.findAll();
    }

    /**
     * Get one yzTableStruct by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public YzTableStruct findOne(Long id) {
        log.debug("Request to get YzTableStruct : {}", id);
        return yzTableStructRepository.findOne(id);
    }

    /**
     * Delete the yzTableStruct by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete YzTableStruct : {}", id);
        yzTableStructRepository.delete(id);
    }
}
