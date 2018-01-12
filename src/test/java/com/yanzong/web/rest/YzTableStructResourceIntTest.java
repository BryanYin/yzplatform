package com.yanzong.web.rest;

import com.yanzong.CdbGradeApp;

import com.yanzong.domain.YzTableStruct;
import com.yanzong.repository.YzTableStructRepository;
import com.yanzong.service.YzTableStructService;
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
 * Test class for the YzTableStructResource REST controller.
 *
 * @see YzTableStructResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CdbGradeApp.class)
public class YzTableStructResourceIntTest {

    private static final String DEFAULT_TABLE_SCHEMA = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_SCHEMA = "BBBBBBBBBB";

    private static final String DEFAULT_TABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDINAL_POSITION = 1;
    private static final Integer UPDATED_ORDINAL_POSITION = 2;

    private static final String DEFAULT_COLUMN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DATA_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DATA_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_CHARACTER_MAX_LENGTH = 1;
    private static final Integer UPDATED_CHARACTER_MAX_LENGTH = 2;

    private static final Integer DEFAULT_NUMERIC_PRECISION = 1;
    private static final Integer UPDATED_NUMERIC_PRECISION = 2;

    private static final Integer DEFAULT_NUMERIC_SCALE = 1;
    private static final Integer UPDATED_NUMERIC_SCALE = 2;

    private static final Boolean DEFAULT_NULLABLE = false;
    private static final Boolean UPDATED_NULLABLE = true;

    private static final String DEFAULT_COLUMN_DEFAULT = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_DEFAULT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private YzTableStructRepository yzTableStructRepository;

    @Autowired
    private YzTableStructService yzTableStructService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restYzTableStructMockMvc;

    private YzTableStruct yzTableStruct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YzTableStructResource yzTableStructResource = new YzTableStructResource(yzTableStructService);
        this.restYzTableStructMockMvc = MockMvcBuilders.standaloneSetup(yzTableStructResource)
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
    public static YzTableStruct createEntity(EntityManager em) {
        YzTableStruct yzTableStruct = new YzTableStruct()
            .tableSchema(DEFAULT_TABLE_SCHEMA)
            .tableName(DEFAULT_TABLE_NAME)
            .ordinalPosition(DEFAULT_ORDINAL_POSITION)
            .columnName(DEFAULT_COLUMN_NAME)
            .dataType(DEFAULT_DATA_TYPE)
            .characterMaxLength(DEFAULT_CHARACTER_MAX_LENGTH)
            .numericPrecision(DEFAULT_NUMERIC_PRECISION)
            .numericScale(DEFAULT_NUMERIC_SCALE)
            .nullable(DEFAULT_NULLABLE)
            .columnDefault(DEFAULT_COLUMN_DEFAULT)
            .description(DEFAULT_DESCRIPTION);
        return yzTableStruct;
    }

    @Before
    public void initTest() {
        yzTableStruct = createEntity(em);
    }

    @Test
    @Transactional
    public void createYzTableStruct() throws Exception {
        int databaseSizeBeforeCreate = yzTableStructRepository.findAll().size();

        // Create the YzTableStruct
        restYzTableStructMockMvc.perform(post("/api/yz-table-structs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yzTableStruct)))
            .andExpect(status().isCreated());

        // Validate the YzTableStruct in the database
        List<YzTableStruct> yzTableStructList = yzTableStructRepository.findAll();
        assertThat(yzTableStructList).hasSize(databaseSizeBeforeCreate + 1);
        YzTableStruct testYzTableStruct = yzTableStructList.get(yzTableStructList.size() - 1);
        assertThat(testYzTableStruct.getTableSchema()).isEqualTo(DEFAULT_TABLE_SCHEMA);
        assertThat(testYzTableStruct.getTableName()).isEqualTo(DEFAULT_TABLE_NAME);
        assertThat(testYzTableStruct.getOrdinalPosition()).isEqualTo(DEFAULT_ORDINAL_POSITION);
        assertThat(testYzTableStruct.getColumnName()).isEqualTo(DEFAULT_COLUMN_NAME);
        assertThat(testYzTableStruct.getDataType()).isEqualTo(DEFAULT_DATA_TYPE);
        assertThat(testYzTableStruct.getCharacterMaxLength()).isEqualTo(DEFAULT_CHARACTER_MAX_LENGTH);
        assertThat(testYzTableStruct.getNumericPrecision()).isEqualTo(DEFAULT_NUMERIC_PRECISION);
        assertThat(testYzTableStruct.getNumericScale()).isEqualTo(DEFAULT_NUMERIC_SCALE);
        assertThat(testYzTableStruct.isNullable()).isEqualTo(DEFAULT_NULLABLE);
        assertThat(testYzTableStruct.getColumnDefault()).isEqualTo(DEFAULT_COLUMN_DEFAULT);
        assertThat(testYzTableStruct.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createYzTableStructWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yzTableStructRepository.findAll().size();

        // Create the YzTableStruct with an existing ID
        yzTableStruct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYzTableStructMockMvc.perform(post("/api/yz-table-structs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yzTableStruct)))
            .andExpect(status().isBadRequest());

        // Validate the YzTableStruct in the database
        List<YzTableStruct> yzTableStructList = yzTableStructRepository.findAll();
        assertThat(yzTableStructList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllYzTableStructs() throws Exception {
        // Initialize the database
        yzTableStructRepository.saveAndFlush(yzTableStruct);

        // Get all the yzTableStructList
        restYzTableStructMockMvc.perform(get("/api/yz-table-structs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yzTableStruct.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableSchema").value(hasItem(DEFAULT_TABLE_SCHEMA.toString())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].ordinalPosition").value(hasItem(DEFAULT_ORDINAL_POSITION)))
            .andExpect(jsonPath("$.[*].columnName").value(hasItem(DEFAULT_COLUMN_NAME.toString())))
            .andExpect(jsonPath("$.[*].dataType").value(hasItem(DEFAULT_DATA_TYPE.toString())))
            .andExpect(jsonPath("$.[*].characterMaxLength").value(hasItem(DEFAULT_CHARACTER_MAX_LENGTH)))
            .andExpect(jsonPath("$.[*].numericPrecision").value(hasItem(DEFAULT_NUMERIC_PRECISION)))
            .andExpect(jsonPath("$.[*].numericScale").value(hasItem(DEFAULT_NUMERIC_SCALE)))
            .andExpect(jsonPath("$.[*].nullable").value(hasItem(DEFAULT_NULLABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].columnDefault").value(hasItem(DEFAULT_COLUMN_DEFAULT.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getYzTableStruct() throws Exception {
        // Initialize the database
        yzTableStructRepository.saveAndFlush(yzTableStruct);

        // Get the yzTableStruct
        restYzTableStructMockMvc.perform(get("/api/yz-table-structs/{id}", yzTableStruct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yzTableStruct.getId().intValue()))
            .andExpect(jsonPath("$.tableSchema").value(DEFAULT_TABLE_SCHEMA.toString()))
            .andExpect(jsonPath("$.tableName").value(DEFAULT_TABLE_NAME.toString()))
            .andExpect(jsonPath("$.ordinalPosition").value(DEFAULT_ORDINAL_POSITION))
            .andExpect(jsonPath("$.columnName").value(DEFAULT_COLUMN_NAME.toString()))
            .andExpect(jsonPath("$.dataType").value(DEFAULT_DATA_TYPE.toString()))
            .andExpect(jsonPath("$.characterMaxLength").value(DEFAULT_CHARACTER_MAX_LENGTH))
            .andExpect(jsonPath("$.numericPrecision").value(DEFAULT_NUMERIC_PRECISION))
            .andExpect(jsonPath("$.numericScale").value(DEFAULT_NUMERIC_SCALE))
            .andExpect(jsonPath("$.nullable").value(DEFAULT_NULLABLE.booleanValue()))
            .andExpect(jsonPath("$.columnDefault").value(DEFAULT_COLUMN_DEFAULT.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingYzTableStruct() throws Exception {
        // Get the yzTableStruct
        restYzTableStructMockMvc.perform(get("/api/yz-table-structs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYzTableStruct() throws Exception {
        // Initialize the database
        yzTableStructService.save(yzTableStruct);

        int databaseSizeBeforeUpdate = yzTableStructRepository.findAll().size();

        // Update the yzTableStruct
        YzTableStruct updatedYzTableStruct = yzTableStructRepository.findOne(yzTableStruct.getId());
        // Disconnect from session so that the updates on updatedYzTableStruct are not directly saved in db
        em.detach(updatedYzTableStruct);
        updatedYzTableStruct
            .tableSchema(UPDATED_TABLE_SCHEMA)
            .tableName(UPDATED_TABLE_NAME)
            .ordinalPosition(UPDATED_ORDINAL_POSITION)
            .columnName(UPDATED_COLUMN_NAME)
            .dataType(UPDATED_DATA_TYPE)
            .characterMaxLength(UPDATED_CHARACTER_MAX_LENGTH)
            .numericPrecision(UPDATED_NUMERIC_PRECISION)
            .numericScale(UPDATED_NUMERIC_SCALE)
            .nullable(UPDATED_NULLABLE)
            .columnDefault(UPDATED_COLUMN_DEFAULT)
            .description(UPDATED_DESCRIPTION);

        restYzTableStructMockMvc.perform(put("/api/yz-table-structs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedYzTableStruct)))
            .andExpect(status().isOk());

        // Validate the YzTableStruct in the database
        List<YzTableStruct> yzTableStructList = yzTableStructRepository.findAll();
        assertThat(yzTableStructList).hasSize(databaseSizeBeforeUpdate);
        YzTableStruct testYzTableStruct = yzTableStructList.get(yzTableStructList.size() - 1);
        assertThat(testYzTableStruct.getTableSchema()).isEqualTo(UPDATED_TABLE_SCHEMA);
        assertThat(testYzTableStruct.getTableName()).isEqualTo(UPDATED_TABLE_NAME);
        assertThat(testYzTableStruct.getOrdinalPosition()).isEqualTo(UPDATED_ORDINAL_POSITION);
        assertThat(testYzTableStruct.getColumnName()).isEqualTo(UPDATED_COLUMN_NAME);
        assertThat(testYzTableStruct.getDataType()).isEqualTo(UPDATED_DATA_TYPE);
        assertThat(testYzTableStruct.getCharacterMaxLength()).isEqualTo(UPDATED_CHARACTER_MAX_LENGTH);
        assertThat(testYzTableStruct.getNumericPrecision()).isEqualTo(UPDATED_NUMERIC_PRECISION);
        assertThat(testYzTableStruct.getNumericScale()).isEqualTo(UPDATED_NUMERIC_SCALE);
        assertThat(testYzTableStruct.isNullable()).isEqualTo(UPDATED_NULLABLE);
        assertThat(testYzTableStruct.getColumnDefault()).isEqualTo(UPDATED_COLUMN_DEFAULT);
        assertThat(testYzTableStruct.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingYzTableStruct() throws Exception {
        int databaseSizeBeforeUpdate = yzTableStructRepository.findAll().size();

        // Create the YzTableStruct

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restYzTableStructMockMvc.perform(put("/api/yz-table-structs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yzTableStruct)))
            .andExpect(status().isCreated());

        // Validate the YzTableStruct in the database
        List<YzTableStruct> yzTableStructList = yzTableStructRepository.findAll();
        assertThat(yzTableStructList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteYzTableStruct() throws Exception {
        // Initialize the database
        yzTableStructService.save(yzTableStruct);

        int databaseSizeBeforeDelete = yzTableStructRepository.findAll().size();

        // Get the yzTableStruct
        restYzTableStructMockMvc.perform(delete("/api/yz-table-structs/{id}", yzTableStruct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<YzTableStruct> yzTableStructList = yzTableStructRepository.findAll();
        assertThat(yzTableStructList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(YzTableStruct.class);
        YzTableStruct yzTableStruct1 = new YzTableStruct();
        yzTableStruct1.setId(1L);
        YzTableStruct yzTableStruct2 = new YzTableStruct();
        yzTableStruct2.setId(yzTableStruct1.getId());
        assertThat(yzTableStruct1).isEqualTo(yzTableStruct2);
        yzTableStruct2.setId(2L);
        assertThat(yzTableStruct1).isNotEqualTo(yzTableStruct2);
        yzTableStruct1.setId(null);
        assertThat(yzTableStruct1).isNotEqualTo(yzTableStruct2);
    }
}
