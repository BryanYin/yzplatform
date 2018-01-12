package com.yanzong.web.rest;

import com.yanzong.CdbGradeApp;

import com.yanzong.domain.YzSchemaTable;
import com.yanzong.repository.YzSchemaTableRepository;
import com.yanzong.service.YzSchemaTableService;
import com.yanzong.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.yanzong.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the YzSchemaTableResource REST controller.
 *
 * @see YzSchemaTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CdbGradeApp.class)
public class YzSchemaTableResourceIntTest {

    private static final String DEFAULT_TABLE_SCHEMA = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_SCHEMA = "BBBBBBBBBB";

    private static final String DEFAULT_TABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NAME = "BBBBBBBBBB";

    @Autowired
    private YzSchemaTableRepository yzSchemaTableRepository;

    @Autowired
    private YzSchemaTableService yzSchemaTableService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restYzSchemaTableMockMvc;

    private YzSchemaTable yzSchemaTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YzSchemaTableResource yzSchemaTableResource = new YzSchemaTableResource(yzSchemaTableService);
        this.restYzSchemaTableMockMvc = MockMvcBuilders.standaloneSetup(yzSchemaTableResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static YzSchemaTable createEntity(EntityManager em) {
        YzSchemaTable yzSchemaTable = new YzSchemaTable()
            .tableSchema(DEFAULT_TABLE_SCHEMA)
            .tableName(DEFAULT_TABLE_NAME);
        return yzSchemaTable;
    }

    @Before
    public void initTest() {
        yzSchemaTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createYzSchemaTable() throws Exception {
        int databaseSizeBeforeCreate = yzSchemaTableRepository.findAll().size();

        // Create the YzSchemaTable
        restYzSchemaTableMockMvc.perform(post("/api/yz-schema-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yzSchemaTable)))
            .andExpect(status().isCreated());

        // Validate the YzSchemaTable in the database
        List<YzSchemaTable> yzSchemaTableList = yzSchemaTableRepository.findAll();
        assertThat(yzSchemaTableList).hasSize(databaseSizeBeforeCreate + 1);
        YzSchemaTable testYzSchemaTable = yzSchemaTableList.get(yzSchemaTableList.size() - 1);
        assertThat(testYzSchemaTable.getTableSchema()).isEqualTo(DEFAULT_TABLE_SCHEMA);
        assertThat(testYzSchemaTable.getTableName()).isEqualTo(DEFAULT_TABLE_NAME);
    }

    @Test
    @Transactional
    public void createYzSchemaTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yzSchemaTableRepository.findAll().size();

        // Create the YzSchemaTable with an existing ID
        yzSchemaTable.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYzSchemaTableMockMvc.perform(post("/api/yz-schema-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yzSchemaTable)))
            .andExpect(status().isBadRequest());

        // Validate the YzSchemaTable in the database
        List<YzSchemaTable> yzSchemaTableList = yzSchemaTableRepository.findAll();
        assertThat(yzSchemaTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllYzSchemaTables() throws Exception {
        // Initialize the database
        yzSchemaTableRepository.saveAndFlush(yzSchemaTable);

        // Get all the yzSchemaTableList
        restYzSchemaTableMockMvc.perform(get("/api/yz-schema-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yzSchemaTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableSchema").value(hasItem(DEFAULT_TABLE_SCHEMA.toString())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())));
    }

    @Test
    @Transactional
    public void getYzSchemaTable() throws Exception {
        // Initialize the database
        yzSchemaTableRepository.saveAndFlush(yzSchemaTable);

        // Get the yzSchemaTable
        restYzSchemaTableMockMvc.perform(get("/api/yz-schema-tables/{id}", yzSchemaTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yzSchemaTable.getId().intValue()))
            .andExpect(jsonPath("$.tableSchema").value(DEFAULT_TABLE_SCHEMA.toString()))
            .andExpect(jsonPath("$.tableName").value(DEFAULT_TABLE_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingYzSchemaTable() throws Exception {
        // Get the yzSchemaTable
        restYzSchemaTableMockMvc.perform(get("/api/yz-schema-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYzSchemaTable() throws Exception {
        // Initialize the database
        yzSchemaTableService.save(yzSchemaTable);

        int databaseSizeBeforeUpdate = yzSchemaTableRepository.findAll().size();

        // Update the yzSchemaTable
        YzSchemaTable updatedYzSchemaTable = yzSchemaTableRepository.findOne(yzSchemaTable.getId());
        // Disconnect from session so that the updates on updatedYzSchemaTable are not directly saved in db
        em.detach(updatedYzSchemaTable);
        updatedYzSchemaTable
            .tableSchema(UPDATED_TABLE_SCHEMA)
            .tableName(UPDATED_TABLE_NAME);

        restYzSchemaTableMockMvc.perform(put("/api/yz-schema-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedYzSchemaTable)))
            .andExpect(status().isOk());

        // Validate the YzSchemaTable in the database
        List<YzSchemaTable> yzSchemaTableList = yzSchemaTableRepository.findAll();
        assertThat(yzSchemaTableList).hasSize(databaseSizeBeforeUpdate);
        YzSchemaTable testYzSchemaTable = yzSchemaTableList.get(yzSchemaTableList.size() - 1);
        assertThat(testYzSchemaTable.getTableSchema()).isEqualTo(UPDATED_TABLE_SCHEMA);
        assertThat(testYzSchemaTable.getTableName()).isEqualTo(UPDATED_TABLE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingYzSchemaTable() throws Exception {
        int databaseSizeBeforeUpdate = yzSchemaTableRepository.findAll().size();

        // Create the YzSchemaTable

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restYzSchemaTableMockMvc.perform(put("/api/yz-schema-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yzSchemaTable)))
            .andExpect(status().isCreated());

        // Validate the YzSchemaTable in the database
        List<YzSchemaTable> yzSchemaTableList = yzSchemaTableRepository.findAll();
        assertThat(yzSchemaTableList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteYzSchemaTable() throws Exception {
        // Initialize the database
        yzSchemaTableService.save(yzSchemaTable);

        int databaseSizeBeforeDelete = yzSchemaTableRepository.findAll().size();

        // Get the yzSchemaTable
        restYzSchemaTableMockMvc.perform(delete("/api/yz-schema-tables/{id}", yzSchemaTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<YzSchemaTable> yzSchemaTableList = yzSchemaTableRepository.findAll();
        assertThat(yzSchemaTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(YzSchemaTable.class);
        YzSchemaTable yzSchemaTable1 = new YzSchemaTable();
        yzSchemaTable1.setId(1L);
        YzSchemaTable yzSchemaTable2 = new YzSchemaTable();
        yzSchemaTable2.setId(yzSchemaTable1.getId());
        assertThat(yzSchemaTable1).isEqualTo(yzSchemaTable2);
        yzSchemaTable2.setId(2L);
        assertThat(yzSchemaTable1).isNotEqualTo(yzSchemaTable2);
        yzSchemaTable1.setId(null);
        assertThat(yzSchemaTable1).isNotEqualTo(yzSchemaTable2);
    }
}
