package com.school.management.web.rest;

import com.school.management.JbemSchoolManagementApp;

import com.school.management.domain.Attendence;
import com.school.management.repository.AttendenceRepository;
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
 * Test class for the AttendenceResource REST controller.
 *
 * @see AttendenceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbemSchoolManagementApp.class)
public class AttendenceResourceIntTest {

    private static final String DEFAULT_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DATE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PRESENT = false;
    private static final Boolean UPDATED_PRESENT = true;

    @Autowired
    private AttendenceRepository attendenceRepository;

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

    private MockMvc restAttendenceMockMvc;

    private Attendence attendence;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AttendenceResource attendenceResource = new AttendenceResource(attendenceRepository);
        this.restAttendenceMockMvc = MockMvcBuilders.standaloneSetup(attendenceResource)
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
    public static Attendence createEntity(EntityManager em) {
        Attendence attendence = new Attendence()
            .date(DEFAULT_DATE)
            .present(DEFAULT_PRESENT);
        return attendence;
    }

    @Before
    public void initTest() {
        attendence = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttendence() throws Exception {
        int databaseSizeBeforeCreate = attendenceRepository.findAll().size();

        // Create the Attendence
        restAttendenceMockMvc.perform(post("/api/attendences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendence)))
            .andExpect(status().isCreated());

        // Validate the Attendence in the database
        List<Attendence> attendenceList = attendenceRepository.findAll();
        assertThat(attendenceList).hasSize(databaseSizeBeforeCreate + 1);
        Attendence testAttendence = attendenceList.get(attendenceList.size() - 1);
        assertThat(testAttendence.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testAttendence.isPresent()).isEqualTo(DEFAULT_PRESENT);
    }

    @Test
    @Transactional
    public void createAttendenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attendenceRepository.findAll().size();

        // Create the Attendence with an existing ID
        attendence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttendenceMockMvc.perform(post("/api/attendences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendence)))
            .andExpect(status().isBadRequest());

        // Validate the Attendence in the database
        List<Attendence> attendenceList = attendenceRepository.findAll();
        assertThat(attendenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAttendences() throws Exception {
        // Initialize the database
        attendenceRepository.saveAndFlush(attendence);

        // Get all the attendenceList
        restAttendenceMockMvc.perform(get("/api/attendences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attendence.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].present").value(hasItem(DEFAULT_PRESENT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAttendence() throws Exception {
        // Initialize the database
        attendenceRepository.saveAndFlush(attendence);

        // Get the attendence
        restAttendenceMockMvc.perform(get("/api/attendences/{id}", attendence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(attendence.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.present").value(DEFAULT_PRESENT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAttendence() throws Exception {
        // Get the attendence
        restAttendenceMockMvc.perform(get("/api/attendences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttendence() throws Exception {
        // Initialize the database
        attendenceRepository.saveAndFlush(attendence);

        int databaseSizeBeforeUpdate = attendenceRepository.findAll().size();

        // Update the attendence
        Attendence updatedAttendence = attendenceRepository.findById(attendence.getId()).get();
        // Disconnect from session so that the updates on updatedAttendence are not directly saved in db
        em.detach(updatedAttendence);
        updatedAttendence
            .date(UPDATED_DATE)
            .present(UPDATED_PRESENT);

        restAttendenceMockMvc.perform(put("/api/attendences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAttendence)))
            .andExpect(status().isOk());

        // Validate the Attendence in the database
        List<Attendence> attendenceList = attendenceRepository.findAll();
        assertThat(attendenceList).hasSize(databaseSizeBeforeUpdate);
        Attendence testAttendence = attendenceList.get(attendenceList.size() - 1);
        assertThat(testAttendence.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testAttendence.isPresent()).isEqualTo(UPDATED_PRESENT);
    }

    @Test
    @Transactional
    public void updateNonExistingAttendence() throws Exception {
        int databaseSizeBeforeUpdate = attendenceRepository.findAll().size();

        // Create the Attendence

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttendenceMockMvc.perform(put("/api/attendences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attendence)))
            .andExpect(status().isBadRequest());

        // Validate the Attendence in the database
        List<Attendence> attendenceList = attendenceRepository.findAll();
        assertThat(attendenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAttendence() throws Exception {
        // Initialize the database
        attendenceRepository.saveAndFlush(attendence);

        int databaseSizeBeforeDelete = attendenceRepository.findAll().size();

        // Get the attendence
        restAttendenceMockMvc.perform(delete("/api/attendences/{id}", attendence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Attendence> attendenceList = attendenceRepository.findAll();
        assertThat(attendenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attendence.class);
        Attendence attendence1 = new Attendence();
        attendence1.setId(1L);
        Attendence attendence2 = new Attendence();
        attendence2.setId(attendence1.getId());
        assertThat(attendence1).isEqualTo(attendence2);
        attendence2.setId(2L);
        assertThat(attendence1).isNotEqualTo(attendence2);
        attendence1.setId(null);
        assertThat(attendence1).isNotEqualTo(attendence2);
    }
}
