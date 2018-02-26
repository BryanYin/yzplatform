package com.yanzong.web.rest;

import com.yanzong.CdbGradeApp;

import com.yanzong.domain.Grade;
import com.yanzong.repository.GradeRepository;
import com.yanzong.service.GradeService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.yanzong.web.rest.TestUtil.sameInstant;
import static com.yanzong.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GradeResource REST controller.
 *
 * @see GradeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CdbGradeApp.class)
public class GradeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_SCDW = 1D;
    private static final Double UPDATED_SCDW = 2D;

    private static final Double DEFAULT_GGBL = 1D;
    private static final Double UPDATED_GGBL = 2D;

    private static final Double DEFAULT_LLYS = 1D;
    private static final Double UPDATED_LLYS = 2D;

    private static final Double DEFAULT_XJLDX = 1D;
    private static final Double UPDATED_XJLDX = 2D;

    private static final Double DEFAULT_CSNL = 1D;
    private static final Double UPDATED_CSNL = 2D;

    private static final Double DEFAULT_YLNL = 1D;
    private static final Double UPDATED_YLNL = 2D;

    private static final Double DEFAULT_KHPJ = 1D;
    private static final Double UPDATED_KHPJ = 2D;

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_EVENT_TIME = "AAAAAAAAAA";
    private static final String UPDATED_EVENT_TIME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DB_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DB_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private GradeService gradeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGradeMockMvc;

    private Grade grade;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GradeResource gradeResource = new GradeResource(gradeService);
        this.restGradeMockMvc = MockMvcBuilders.standaloneSetup(gradeResource)
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
    public static Grade createEntity(EntityManager em) {
        Grade grade = new Grade()
            .name(DEFAULT_NAME)
            .scdw(DEFAULT_SCDW)
            .ggbl(DEFAULT_GGBL)
            .llys(DEFAULT_LLYS)
            .xjldx(DEFAULT_XJLDX)
            .csnl(DEFAULT_CSNL)
            .ylnl(DEFAULT_YLNL)
            .khpj(DEFAULT_KHPJ)
            .country(DEFAULT_COUNTRY)
            .eventTime(DEFAULT_EVENT_TIME)
            .dbTime(DEFAULT_DB_TIME);
        return grade;
    }

    @Before
    public void initTest() {
        grade = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrade() throws Exception {
        int databaseSizeBeforeCreate = gradeRepository.findAll().size();

        // Create the Grade
        restGradeMockMvc.perform(post("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grade)))
            .andExpect(status().isCreated());

        // Validate the Grade in the database
        List<Grade> gradeList = gradeRepository.findAll();
        assertThat(gradeList).hasSize(databaseSizeBeforeCreate + 1);
        Grade testGrade = gradeList.get(gradeList.size() - 1);
        assertThat(testGrade.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGrade.getScdw()).isEqualTo(DEFAULT_SCDW);
        assertThat(testGrade.getGgbl()).isEqualTo(DEFAULT_GGBL);
        assertThat(testGrade.getLlys()).isEqualTo(DEFAULT_LLYS);
        assertThat(testGrade.getXjldx()).isEqualTo(DEFAULT_XJLDX);
        assertThat(testGrade.getCsnl()).isEqualTo(DEFAULT_CSNL);
        assertThat(testGrade.getYlnl()).isEqualTo(DEFAULT_YLNL);
        assertThat(testGrade.getKhpj()).isEqualTo(DEFAULT_KHPJ);
        assertThat(testGrade.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testGrade.getEventTime()).isEqualTo(DEFAULT_EVENT_TIME);
        assertThat(testGrade.getDbTime()).isEqualTo(DEFAULT_DB_TIME);
    }

    @Test
    @Transactional
    public void createGradeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gradeRepository.findAll().size();

        // Create the Grade with an existing ID
        grade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGradeMockMvc.perform(post("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grade)))
            .andExpect(status().isBadRequest());

        // Validate the Grade in the database
        List<Grade> gradeList = gradeRepository.findAll();
        assertThat(gradeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGrades() throws Exception {
        // Initialize the database
        gradeRepository.saveAndFlush(grade);

        // Get all the gradeList
        restGradeMockMvc.perform(get("/api/grades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grade.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].scdw").value(hasItem(DEFAULT_SCDW.doubleValue())))
            .andExpect(jsonPath("$.[*].ggbl").value(hasItem(DEFAULT_GGBL.doubleValue())))
            .andExpect(jsonPath("$.[*].llys").value(hasItem(DEFAULT_LLYS.doubleValue())))
            .andExpect(jsonPath("$.[*].xjldx").value(hasItem(DEFAULT_XJLDX.doubleValue())))
            .andExpect(jsonPath("$.[*].csnl").value(hasItem(DEFAULT_CSNL.doubleValue())))
            .andExpect(jsonPath("$.[*].ylnl").value(hasItem(DEFAULT_YLNL.doubleValue())))
            .andExpect(jsonPath("$.[*].khpj").value(hasItem(DEFAULT_KHPJ.doubleValue())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].eventTime").value(hasItem(DEFAULT_EVENT_TIME.toString())))
            .andExpect(jsonPath("$.[*].dbTime").value(hasItem(sameInstant(DEFAULT_DB_TIME))));
    }

    @Test
    @Transactional
    public void getGrade() throws Exception {
        // Initialize the database
        gradeRepository.saveAndFlush(grade);

        // Get the grade
        restGradeMockMvc.perform(get("/api/grades/{id}", grade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(grade.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.scdw").value(DEFAULT_SCDW.doubleValue()))
            .andExpect(jsonPath("$.ggbl").value(DEFAULT_GGBL.doubleValue()))
            .andExpect(jsonPath("$.llys").value(DEFAULT_LLYS.doubleValue()))
            .andExpect(jsonPath("$.xjldx").value(DEFAULT_XJLDX.doubleValue()))
            .andExpect(jsonPath("$.csnl").value(DEFAULT_CSNL.doubleValue()))
            .andExpect(jsonPath("$.ylnl").value(DEFAULT_YLNL.doubleValue()))
            .andExpect(jsonPath("$.khpj").value(DEFAULT_KHPJ.doubleValue()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.eventTime").value(DEFAULT_EVENT_TIME.toString()))
            .andExpect(jsonPath("$.dbTime").value(sameInstant(DEFAULT_DB_TIME)));
    }

    @Test
    @Transactional
    public void getNonExistingGrade() throws Exception {
        // Get the grade
        restGradeMockMvc.perform(get("/api/grades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrade() throws Exception {
        // Initialize the database
        gradeService.save(grade);

        int databaseSizeBeforeUpdate = gradeRepository.findAll().size();

        // Update the grade
        Grade updatedGrade = gradeRepository.findOne(grade.getId());
        // Disconnect from session so that the updates on updatedGrade are not directly saved in db
        em.detach(updatedGrade);
        updatedGrade
            .name(UPDATED_NAME)
            .scdw(UPDATED_SCDW)
            .ggbl(UPDATED_GGBL)
            .llys(UPDATED_LLYS)
            .xjldx(UPDATED_XJLDX)
            .csnl(UPDATED_CSNL)
            .ylnl(UPDATED_YLNL)
            .khpj(UPDATED_KHPJ)
            .country(UPDATED_COUNTRY)
            .eventTime(UPDATED_EVENT_TIME)
            .dbTime(UPDATED_DB_TIME);

        restGradeMockMvc.perform(put("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrade)))
            .andExpect(status().isOk());

        // Validate the Grade in the database
        List<Grade> gradeList = gradeRepository.findAll();
        assertThat(gradeList).hasSize(databaseSizeBeforeUpdate);
        Grade testGrade = gradeList.get(gradeList.size() - 1);
        assertThat(testGrade.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGrade.getScdw()).isEqualTo(UPDATED_SCDW);
        assertThat(testGrade.getGgbl()).isEqualTo(UPDATED_GGBL);
        assertThat(testGrade.getLlys()).isEqualTo(UPDATED_LLYS);
        assertThat(testGrade.getXjldx()).isEqualTo(UPDATED_XJLDX);
        assertThat(testGrade.getCsnl()).isEqualTo(UPDATED_CSNL);
        assertThat(testGrade.getYlnl()).isEqualTo(UPDATED_YLNL);
        assertThat(testGrade.getKhpj()).isEqualTo(UPDATED_KHPJ);
        assertThat(testGrade.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testGrade.getEventTime()).isEqualTo(UPDATED_EVENT_TIME);
        assertThat(testGrade.getDbTime()).isEqualTo(UPDATED_DB_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingGrade() throws Exception {
        int databaseSizeBeforeUpdate = gradeRepository.findAll().size();

        // Create the Grade

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGradeMockMvc.perform(put("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grade)))
            .andExpect(status().isCreated());

        // Validate the Grade in the database
        List<Grade> gradeList = gradeRepository.findAll();
        assertThat(gradeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGrade() throws Exception {
        // Initialize the database
        gradeService.save(grade);

        int databaseSizeBeforeDelete = gradeRepository.findAll().size();

        // Get the grade
        restGradeMockMvc.perform(delete("/api/grades/{id}", grade.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Grade> gradeList = gradeRepository.findAll();
        assertThat(gradeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Grade.class);
        Grade grade1 = new Grade();
        grade1.setId(1L);
        Grade grade2 = new Grade();
        grade2.setId(grade1.getId());
        assertThat(grade1).isEqualTo(grade2);
        grade2.setId(2L);
        assertThat(grade1).isNotEqualTo(grade2);
        grade1.setId(null);
        assertThat(grade1).isNotEqualTo(grade2);
    }
}
