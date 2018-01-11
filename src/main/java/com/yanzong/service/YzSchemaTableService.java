package com.yanzong.service;

import com.yanzong.domain.YzSchemaTable;
import com.yanzong.repository.YzSchemaTableRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing YzSchemaTable.
 */
@Service
@Transactional
public class YzSchemaTableService {

    private final Logger log = LoggerFactory.getLogger(YzSchemaTableService.class);

    private final YzSchemaTableRepository yzSchemaTableRepository;

    public YzSchemaTableService(YzSchemaTableRepository yzSchemaTableRepository) {
        this.yzSchemaTableRepository = yzSchemaTableRepository;
    }

    /**
     * Save a yzSchemaTable.
     *
     * @param yzSchemaTable the entity to save
     * @return the persisted entity
     */
    public YzSchemaTable save(YzSchemaTable yzSchemaTable) {
        log.debug("Request to save YzSchemaTable : {}", yzSchemaTable);
        return yzSchemaTableRepository.save(yzSchemaTable);
    }

    /**
     * Get all the yzSchemaTables.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<YzSchemaTable> findAll() {
        log.debug("Request to get all YzSchemaTables");
        return yzSchemaTableRepository.findAll();
    }

    /**
     * Get one yzSchemaTable by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public YzSchemaTable findOne(Long id) {
        log.debug("Request to get YzSchemaTable : {}", id);
        return yzSchemaTableRepository.findOne(id);
    }

    /**
     * Delete the yzSchemaTable by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete YzSchemaTable : {}", id);
        yzSchemaTableRepository.delete(id);
    }
}
