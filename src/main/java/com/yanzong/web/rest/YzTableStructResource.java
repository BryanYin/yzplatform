package com.yanzong.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.yanzong.domain.YzTableStruct;
import com.yanzong.service.YzTableStructService;
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
 * REST controller for managing YzTableStruct.
 */
@RestController
@RequestMapping("/api")
public class YzTableStructResource {

    private final Logger log = LoggerFactory.getLogger(YzTableStructResource.class);

    private static final String ENTITY_NAME = "yzTableStruct";

    private final YzTableStructService yzTableStructService;

    public YzTableStructResource(YzTableStructService yzTableStructService) {
        this.yzTableStructService = yzTableStructService;
    }

    /**
     * POST  /yz-table-structs : Create a new yzTableStruct.
     *
     * @param yzTableStruct the yzTableStruct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yzTableStruct, or with status 400 (Bad Request) if the yzTableStruct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/yz-table-structs")
    @Timed
    public ResponseEntity<YzTableStruct> createYzTableStruct(@RequestBody YzTableStruct yzTableStruct) throws URISyntaxException {
        log.debug("REST request to save YzTableStruct : {}", yzTableStruct);
        if (yzTableStruct.getId() != null) {
            throw new BadRequestAlertException("A new yzTableStruct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YzTableStruct result = yzTableStructService.save(yzTableStruct);
        return ResponseEntity.created(new URI("/api/yz-table-structs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /yz-table-structs : Updates an existing yzTableStruct.
     *
     * @param yzTableStruct the yzTableStruct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yzTableStruct,
     * or with status 400 (Bad Request) if the yzTableStruct is not valid,
     * or with status 500 (Internal Server Error) if the yzTableStruct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/yz-table-structs")
    @Timed
    public ResponseEntity<YzTableStruct> updateYzTableStruct(@RequestBody YzTableStruct yzTableStruct) throws URISyntaxException {
        log.debug("REST request to update YzTableStruct : {}", yzTableStruct);
        if (yzTableStruct.getId() == null) {
            return createYzTableStruct(yzTableStruct);
        }
        YzTableStruct result = yzTableStructService.save(yzTableStruct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yzTableStruct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /yz-table-structs : get all the yzTableStructs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of yzTableStructs in body
     */
    @GetMapping("/yz-table-structs")
    @Timed
    public List<YzTableStruct> getAllYzTableStructs() {
        log.debug("REST request to get all YzTableStructs");
        return yzTableStructService.findAll();
        }

    /**
     * GET  /yz-table-structs/:id : get the "id" yzTableStruct.
     *
     * @param id the id of the yzTableStruct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yzTableStruct, or with status 404 (Not Found)
     */
    @GetMapping("/yz-table-structs/{id}")
    @Timed
    public ResponseEntity<YzTableStruct> getYzTableStruct(@PathVariable Long id) {
        log.debug("REST request to get YzTableStruct : {}", id);
        YzTableStruct yzTableStruct = yzTableStructService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(yzTableStruct));
    }

    /**
     * DELETE  /yz-table-structs/:id : delete the "id" yzTableStruct.
     *
     * @param id the id of the yzTableStruct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/yz-table-structs/{id}")
    @Timed
    public ResponseEntity<Void> deleteYzTableStruct(@PathVariable Long id) {
        log.debug("REST request to delete YzTableStruct : {}", id);
        yzTableStructService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
