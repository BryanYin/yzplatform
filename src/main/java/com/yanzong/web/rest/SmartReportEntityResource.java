package com.yanzong.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.yanzong.service.SmartReportEntityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SmartReportEntityResource {

    private final Logger log = LoggerFactory.getLogger(SmartReportEntityResource.class);

    @Autowired
    private SmartReportEntityService smartReportEntityService;


    @GetMapping("/entity/{name}")
    @Timed
    public List<Object> getAllYzSchemaTables(@PathVariable(value = "name") String name) {
        log.debug("REST request to get all {}", name);
        return smartReportEntityService.queryDataByTableName(name);
    }

}
