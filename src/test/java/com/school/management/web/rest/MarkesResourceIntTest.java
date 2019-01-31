package com.school.management.web.rest;

import com.school.management.JbemSchoolManagementApp;

import com.school.management.domain.Markes;
import com.school.management.repository.MarkesRepository;
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
 * Test class for the MarkesResource REST controller.
 *
 * @see MarkesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbemSchoolManagementApp.class)
public class MarkesResourceIntTest {

    private static final Long DEFAULT_MARKES = 1L;
    private static final Long UPDATED_MARKES = 2L;

    @Autowired
    private MarkesRepository markesRepository;

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

    private MockMvc restMarkesMockMvc;

    private Markes markes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MarkesResource markesResource = new MarkesResource(markesRepository);
        this.restMarkesMockMvc = MockMvcBuilders.standaloneSetup(markesResource)
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
    public static Markes createEntity(EntityManager em) {
        Markes markes = new Markes()
            .markes(DEFAULT_MARKES);
        return markes;
    }

    @Before
    public void initTest() {
        markes = createEntity(em);
    }

    @Test
    @Transactional
    public void createMarkes() throws Exception {
        int databaseSizeBeforeCreate = markesRepository.findAll().size();

        // Create the Markes
        restMarkesMockMvc.perform(post("/api/markes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markes)))
            .andExpect(status().isCreated());

        // Validate the Markes in the database
        List<Markes> markesList = markesRepository.findAll();
        assertThat(markesList).hasSize(databaseSizeBeforeCreate + 1);
        Markes testMarkes = markesList.get(markesList.size() - 1);
        assertThat(testMarkes.getMarkes()).isEqualTo(DEFAULT_MARKES);
    }

    @Test
    @Transactional
    public void createMarkesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = markesRepository.findAll().size();

        // Create the Markes with an existing ID
        markes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarkesMockMvc.perform(post("/api/markes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markes)))
            .andExpect(status().isBadRequest());

        // Validate the Markes in the database
        List<Markes> markesList = markesRepository.findAll();
        assertThat(markesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMarkes() throws Exception {
        // Initialize the database
        markesRepository.saveAndFlush(markes);

        // Get all the markesList
        restMarkesMockMvc.perform(get("/api/markes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(markes.getId().intValue())))
            .andExpect(jsonPath("$.[*].markes").value(hasItem(DEFAULT_MARKES.intValue())));
    }
    
    @Test
    @Transactional
    public void getMarkes() throws Exception {
        // Initialize the database
        markesRepository.saveAndFlush(markes);

        // Get the markes
        restMarkesMockMvc.perform(get("/api/markes/{id}", markes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(markes.getId().intValue()))
            .andExpect(jsonPath("$.markes").value(DEFAULT_MARKES.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMarkes() throws Exception {
        // Get the markes
        restMarkesMockMvc.perform(get("/api/markes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMarkes() throws Exception {
        // Initialize the database
        markesRepository.saveAndFlush(markes);

        int databaseSizeBeforeUpdate = markesRepository.findAll().size();

        // Update the markes
        Markes updatedMarkes = markesRepository.findById(markes.getId()).get();
        // Disconnect from session so that the updates on updatedMarkes are not directly saved in db
        em.detach(updatedMarkes);
        updatedMarkes
            .markes(UPDATED_MARKES);

        restMarkesMockMvc.perform(put("/api/markes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMarkes)))
            .andExpect(status().isOk());

        // Validate the Markes in the database
        List<Markes> markesList = markesRepository.findAll();
        assertThat(markesList).hasSize(databaseSizeBeforeUpdate);
        Markes testMarkes = markesList.get(markesList.size() - 1);
        assertThat(testMarkes.getMarkes()).isEqualTo(UPDATED_MARKES);
    }

    @Test
    @Transactional
    public void updateNonExistingMarkes() throws Exception {
        int databaseSizeBeforeUpdate = markesRepository.findAll().size();

        // Create the Markes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarkesMockMvc.perform(put("/api/markes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markes)))
            .andExpect(status().isBadRequest());

        // Validate the Markes in the database
        List<Markes> markesList = markesRepository.findAll();
        assertThat(markesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMarkes() throws Exception {
        // Initialize the database
        markesRepository.saveAndFlush(markes);

        int databaseSizeBeforeDelete = markesRepository.findAll().size();

        // Delete the markes
        restMarkesMockMvc.perform(delete("/api/markes/{id}", markes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Markes> markesList = markesRepository.findAll();
        assertThat(markesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Markes.class);
        Markes markes1 = new Markes();
        markes1.setId(1L);
        Markes markes2 = new Markes();
        markes2.setId(markes1.getId());
        assertThat(markes1).isEqualTo(markes2);
        markes2.setId(2L);
        assertThat(markes1).isNotEqualTo(markes2);
        markes1.setId(null);
        assertThat(markes1).isNotEqualTo(markes2);
    }
}
