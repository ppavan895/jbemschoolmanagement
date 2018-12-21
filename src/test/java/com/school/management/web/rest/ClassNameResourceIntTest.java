package com.school.management.web.rest;

import com.school.management.JbemSchoolManagementApp;

import com.school.management.domain.ClassName;
import com.school.management.repository.ClassNameRepository;
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
 * Test class for the ClassNameResource REST controller.
 *
 * @see ClassNameResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbemSchoolManagementApp.class)
public class ClassNameResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_CLASS_NUMBER = 1L;
    private static final Long UPDATED_CLASS_NUMBER = 2L;

    @Autowired
    private ClassNameRepository classNameRepository;

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

    private MockMvc restClassNameMockMvc;

    private ClassName className;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClassNameResource classNameResource = new ClassNameResource(classNameRepository);
        this.restClassNameMockMvc = MockMvcBuilders.standaloneSetup(classNameResource)
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
    public static ClassName createEntity(EntityManager em) {
        ClassName className = new ClassName()
            .name(DEFAULT_NAME)
            .classNumber(DEFAULT_CLASS_NUMBER);
        return className;
    }

    @Before
    public void initTest() {
        className = createEntity(em);
    }

    @Test
    @Transactional
    public void createClassName() throws Exception {
        int databaseSizeBeforeCreate = classNameRepository.findAll().size();

        // Create the ClassName
        restClassNameMockMvc.perform(post("/api/class-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(className)))
            .andExpect(status().isCreated());

        // Validate the ClassName in the database
        List<ClassName> classNameList = classNameRepository.findAll();
        assertThat(classNameList).hasSize(databaseSizeBeforeCreate + 1);
        ClassName testClassName = classNameList.get(classNameList.size() - 1);
        assertThat(testClassName.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testClassName.getClassNumber()).isEqualTo(DEFAULT_CLASS_NUMBER);
    }

    @Test
    @Transactional
    public void createClassNameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = classNameRepository.findAll().size();

        // Create the ClassName with an existing ID
        className.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassNameMockMvc.perform(post("/api/class-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(className)))
            .andExpect(status().isBadRequest());

        // Validate the ClassName in the database
        List<ClassName> classNameList = classNameRepository.findAll();
        assertThat(classNameList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClassNames() throws Exception {
        // Initialize the database
        classNameRepository.saveAndFlush(className);

        // Get all the classNameList
        restClassNameMockMvc.perform(get("/api/class-names?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(className.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].classNumber").value(hasItem(DEFAULT_CLASS_NUMBER.intValue())));
    }
    
    @Test
    @Transactional
    public void getClassName() throws Exception {
        // Initialize the database
        classNameRepository.saveAndFlush(className);

        // Get the className
        restClassNameMockMvc.perform(get("/api/class-names/{id}", className.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(className.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.classNumber").value(DEFAULT_CLASS_NUMBER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingClassName() throws Exception {
        // Get the className
        restClassNameMockMvc.perform(get("/api/class-names/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClassName() throws Exception {
        // Initialize the database
        classNameRepository.saveAndFlush(className);

        int databaseSizeBeforeUpdate = classNameRepository.findAll().size();

        // Update the className
        ClassName updatedClassName = classNameRepository.findById(className.getId()).get();
        // Disconnect from session so that the updates on updatedClassName are not directly saved in db
        em.detach(updatedClassName);
        updatedClassName
            .name(UPDATED_NAME)
            .classNumber(UPDATED_CLASS_NUMBER);

        restClassNameMockMvc.perform(put("/api/class-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClassName)))
            .andExpect(status().isOk());

        // Validate the ClassName in the database
        List<ClassName> classNameList = classNameRepository.findAll();
        assertThat(classNameList).hasSize(databaseSizeBeforeUpdate);
        ClassName testClassName = classNameList.get(classNameList.size() - 1);
        assertThat(testClassName.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testClassName.getClassNumber()).isEqualTo(UPDATED_CLASS_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingClassName() throws Exception {
        int databaseSizeBeforeUpdate = classNameRepository.findAll().size();

        // Create the ClassName

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassNameMockMvc.perform(put("/api/class-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(className)))
            .andExpect(status().isBadRequest());

        // Validate the ClassName in the database
        List<ClassName> classNameList = classNameRepository.findAll();
        assertThat(classNameList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClassName() throws Exception {
        // Initialize the database
        classNameRepository.saveAndFlush(className);

        int databaseSizeBeforeDelete = classNameRepository.findAll().size();

        // Get the className
        restClassNameMockMvc.perform(delete("/api/class-names/{id}", className.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClassName> classNameList = classNameRepository.findAll();
        assertThat(classNameList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClassName.class);
        ClassName className1 = new ClassName();
        className1.setId(1L);
        ClassName className2 = new ClassName();
        className2.setId(className1.getId());
        assertThat(className1).isEqualTo(className2);
        className2.setId(2L);
        assertThat(className1).isNotEqualTo(className2);
        className1.setId(null);
        assertThat(className1).isNotEqualTo(className2);
    }
}
