package com.school.management.web.rest;

import com.school.management.JbemSchoolManagementApp;

import com.school.management.domain.StudentFee;
import com.school.management.repository.StudentFeeRepository;
import com.school.management.web.rest.errors.ExceptionTranslator;

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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.school.management.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StudentFeeResource REST controller.
 *
 * @see StudentFeeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbemSchoolManagementApp.class)
public class StudentFeeResourceIntTest {

    private static final Long DEFAULT_TOTAL_FEE = 1L;
    private static final Long UPDATED_TOTAL_FEE = 2L;

    private static final Long DEFAULT_FEE_PAID = 1L;
    private static final Long UPDATED_FEE_PAID = 2L;

    @Autowired
    private StudentFeeRepository studentFeeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStudentFeeMockMvc;

    private StudentFee studentFee;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentFeeResource studentFeeResource = new StudentFeeResource(studentFeeRepository);
        this.restStudentFeeMockMvc = MockMvcBuilders.standaloneSetup(studentFeeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentFee createEntity(EntityManager em) {
        StudentFee studentFee = new StudentFee()
            .totalFee(DEFAULT_TOTAL_FEE)
            .feePaid(DEFAULT_FEE_PAID);
        return studentFee;
    }

    @Before
    public void initTest() {
        studentFee = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentFee() throws Exception {
        int databaseSizeBeforeCreate = studentFeeRepository.findAll().size();

        // Create the StudentFee
        restStudentFeeMockMvc.perform(post("/api/student-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentFee)))
            .andExpect(status().isCreated());

        // Validate the StudentFee in the database
        List<StudentFee> studentFeeList = studentFeeRepository.findAll();
        assertThat(studentFeeList).hasSize(databaseSizeBeforeCreate + 1);
        StudentFee testStudentFee = studentFeeList.get(studentFeeList.size() - 1);
        assertThat(testStudentFee.getTotalFee()).isEqualTo(DEFAULT_TOTAL_FEE);
        assertThat(testStudentFee.getFeePaid()).isEqualTo(DEFAULT_FEE_PAID);
    }

    @Test
    @Transactional
    public void createStudentFeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentFeeRepository.findAll().size();

        // Create the StudentFee with an existing ID
        studentFee.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentFeeMockMvc.perform(post("/api/student-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentFee)))
            .andExpect(status().isBadRequest());

        // Validate the StudentFee in the database
        List<StudentFee> studentFeeList = studentFeeRepository.findAll();
        assertThat(studentFeeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStudentFees() throws Exception {
        // Initialize the database
        studentFeeRepository.saveAndFlush(studentFee);

        // Get all the studentFeeList
        restStudentFeeMockMvc.perform(get("/api/student-fees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentFee.getId().intValue())))
            .andExpect(jsonPath("$.[*].totalFee").value(hasItem(DEFAULT_TOTAL_FEE.intValue())))
            .andExpect(jsonPath("$.[*].feePaid").value(hasItem(DEFAULT_FEE_PAID.intValue())));
    }
    
    @Test
    @Transactional
    public void getStudentFee() throws Exception {
        // Initialize the database
        studentFeeRepository.saveAndFlush(studentFee);

        // Get the studentFee
        restStudentFeeMockMvc.perform(get("/api/student-fees/{id}", studentFee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studentFee.getId().intValue()))
            .andExpect(jsonPath("$.totalFee").value(DEFAULT_TOTAL_FEE.intValue()))
            .andExpect(jsonPath("$.feePaid").value(DEFAULT_FEE_PAID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStudentFee() throws Exception {
        // Get the studentFee
        restStudentFeeMockMvc.perform(get("/api/student-fees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentFee() throws Exception {
        // Initialize the database
        studentFeeRepository.saveAndFlush(studentFee);

        int databaseSizeBeforeUpdate = studentFeeRepository.findAll().size();

        // Update the studentFee
        StudentFee updatedStudentFee = studentFeeRepository.findById(studentFee.getId()).get();
        // Disconnect from session so that the updates on updatedStudentFee are not directly saved in db
        em.detach(updatedStudentFee);
        updatedStudentFee
            .totalFee(UPDATED_TOTAL_FEE)
            .feePaid(UPDATED_FEE_PAID);

        restStudentFeeMockMvc.perform(put("/api/student-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudentFee)))
            .andExpect(status().isOk());

        // Validate the StudentFee in the database
        List<StudentFee> studentFeeList = studentFeeRepository.findAll();
        assertThat(studentFeeList).hasSize(databaseSizeBeforeUpdate);
        StudentFee testStudentFee = studentFeeList.get(studentFeeList.size() - 1);
        assertThat(testStudentFee.getTotalFee()).isEqualTo(UPDATED_TOTAL_FEE);
        assertThat(testStudentFee.getFeePaid()).isEqualTo(UPDATED_FEE_PAID);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentFee() throws Exception {
        int databaseSizeBeforeUpdate = studentFeeRepository.findAll().size();

        // Create the StudentFee

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentFeeMockMvc.perform(put("/api/student-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentFee)))
            .andExpect(status().isBadRequest());

        // Validate the StudentFee in the database
        List<StudentFee> studentFeeList = studentFeeRepository.findAll();
        assertThat(studentFeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentFee() throws Exception {
        // Initialize the database
        studentFeeRepository.saveAndFlush(studentFee);

        int databaseSizeBeforeDelete = studentFeeRepository.findAll().size();

        // Delete the studentFee
        restStudentFeeMockMvc.perform(delete("/api/student-fees/{id}", studentFee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StudentFee> studentFeeList = studentFeeRepository.findAll();
        assertThat(studentFeeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentFee.class);
        StudentFee studentFee1 = new StudentFee();
        studentFee1.setId(1L);
        StudentFee studentFee2 = new StudentFee();
        studentFee2.setId(studentFee1.getId());
        assertThat(studentFee1).isEqualTo(studentFee2);
        studentFee2.setId(2L);
        assertThat(studentFee1).isNotEqualTo(studentFee2);
        studentFee1.setId(null);
        assertThat(studentFee1).isNotEqualTo(studentFee2);
    }
}
