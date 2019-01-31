package com.school.management.web.rest;
import com.school.management.domain.StudentFee;
import com.school.management.repository.StudentFeeRepository;
import com.school.management.web.rest.errors.BadRequestAlertException;
import com.school.management.web.rest.util.HeaderUtil;
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
 * REST controller for managing StudentFee.
 */
@RestController
@RequestMapping("/api")
public class StudentFeeResource {

    private final Logger log = LoggerFactory.getLogger(StudentFeeResource.class);

    private static final String ENTITY_NAME = "studentFee";

    private final StudentFeeRepository studentFeeRepository;

    public StudentFeeResource(StudentFeeRepository studentFeeRepository) {
        this.studentFeeRepository = studentFeeRepository;
    }

    /**
     * POST  /student-fees : Create a new studentFee.
     *
     * @param studentFee the studentFee to create
     * @return the ResponseEntity with status 201 (Created) and with body the new studentFee, or with status 400 (Bad Request) if the studentFee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/student-fees")
    public ResponseEntity<StudentFee> createStudentFee(@RequestBody StudentFee studentFee) throws URISyntaxException {
        log.debug("REST request to save StudentFee : {}", studentFee);
        if (studentFee.getId() != null) {
            throw new BadRequestAlertException("A new studentFee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentFee result = studentFeeRepository.save(studentFee);
        return ResponseEntity.created(new URI("/api/student-fees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /student-fees : Updates an existing studentFee.
     *
     * @param studentFee the studentFee to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated studentFee,
     * or with status 400 (Bad Request) if the studentFee is not valid,
     * or with status 500 (Internal Server Error) if the studentFee couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/student-fees")
    public ResponseEntity<StudentFee> updateStudentFee(@RequestBody StudentFee studentFee) throws URISyntaxException {
        log.debug("REST request to update StudentFee : {}", studentFee);
        if (studentFee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentFee result = studentFeeRepository.save(studentFee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, studentFee.getId().toString()))
            .body(result);
    }

    /**
     * GET  /student-fees : get all the studentFees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of studentFees in body
     */
    @GetMapping("/student-fees")
    public List<StudentFee> getAllStudentFees() {
        log.debug("REST request to get all StudentFees");
        return studentFeeRepository.findAll();
    }

    /**
     * GET  /student-fees/:id : get the "id" studentFee.
     *
     * @param id the id of the studentFee to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the studentFee, or with status 404 (Not Found)
     */
    @GetMapping("/student-fees/{id}")
    public ResponseEntity<StudentFee> getStudentFee(@PathVariable Long id) {
        log.debug("REST request to get StudentFee : {}", id);
        Optional<StudentFee> studentFee = studentFeeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(studentFee);
    }

    /**
     * DELETE  /student-fees/:id : delete the "id" studentFee.
     *
     * @param id the id of the studentFee to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/student-fees/{id}")
    public ResponseEntity<Void> deleteStudentFee(@PathVariable Long id) {
        log.debug("REST request to delete StudentFee : {}", id);
        studentFeeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
