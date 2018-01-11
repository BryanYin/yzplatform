package com.yanzong.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.yanzong.domain.YzSchemaTable;
import com.yanzong.service.YzSchemaTableService;
import com.yanzong.web.rest.errors.BadRequestAlertException;
import com.yanzong.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing YzSchemaTable.
 */
@RestController
@RequestMapping("/api")
public class YzSchemaTableResource {

    private final Logger log = LoggerFactory.getLogger(YzSchemaTableResource.class);

    private static final String ENTITY_NAME = "yzSchemaTable";

    private final YzSchemaTableService yzSchemaTableService;

    public YzSchemaTableResource(YzSchemaTableService yzSchemaTableService) {
        this.yzSchemaTableService = yzSchemaTableService;
    }

    /**
     * POST  /yz-schema-tables : Create a new yzSchemaTable.
     *
     * @param yzSchemaTable the yzSchemaTable to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yzSchemaTable, or with status 400 (Bad Request) if the yzSchemaTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/yz-schema-tables")
    @Timed
    public ResponseEntity<YzSchemaTable> createYzSchemaTable(@RequestBody YzSchemaTable yzSchemaTable) throws URISyntaxException {
        log.debug("REST request to save YzSchemaTable : {}", yzSchemaTable);
        if (yzSchemaTable.getId() != null) {
            throw new BadRequestAlertException("A new yzSchemaTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YzSchemaTable result = yzSchemaTableService.save(yzSchemaTable);
        return ResponseEntity.created(new URI("/api/yz-schema-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /yz-schema-tables : Updates an existing yzSchemaTable.
     *
     * @param yzSchemaTable the yzSchemaTable to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yzSchemaTable,
     * or with status 400 (Bad Request) if the yzSchemaTable is not valid,
     * or with status 500 (Internal Server Error) if the yzSchemaTable couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/yz-schema-tables")
    @Timed
    public ResponseEntity<YzSchemaTable> updateYzSchemaTable(@RequestBody YzSchemaTable yzSchemaTable) throws URISyntaxException {
        log.debug("REST request to update YzSchemaTable : {}", yzSchemaTable);
        if (yzSchemaTable.getId() == null) {
            return createYzSchemaTable(yzSchemaTable);
        }
        YzSchemaTable result = yzSchemaTableService.save(yzSchemaTable);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yzSchemaTable.getId().toString()))
            .body(result);
    }

    /**
     * GET  /yz-schema-tables : get all the yzSchemaTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of yzSchemaTables in body
     */
    @GetMapping("/yz-schema-tables")
    @Timed
    public List<YzSchemaTable> getAllYzSchemaTables() {
        log.debug("REST request to get all YzSchemaTables");
        return yzSchemaTableService.findAll();
        }

    /**
     * GET  /yz-schema-tables/:id : get the "id" yzSchemaTable.
     *
     * @param id the id of the yzSchemaTable to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yzSchemaTable, or with status 404 (Not Found)
     */
    @GetMapping("/yz-schema-tables/{id}")
    @Timed
    public ResponseEntity<YzSchemaTable> getYzSchemaTable(@PathVariable Long id) {
        log.debug("REST request to get YzSchemaTable : {}", id);
        YzSchemaTable yzSchemaTable = yzSchemaTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(yzSchemaTable));
    }

    /**
     * DELETE  /yz-schema-tables/:id : delete the "id" yzSchemaTable.
     *
     * @param id the id of the yzSchemaTable to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/yz-schema-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteYzSchemaTable(@PathVariable Long id) {
        log.debug("REST request to delete YzSchemaTable : {}", id);
        yzSchemaTableService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
