package com.school.management.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.school.management.domain.ClassName;
import com.school.management.repository.ClassNameRepository;
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
 * REST controller for managing ClassName.
 */
@RestController
@RequestMapping("/api")
public class ClassNameResource {

    private final Logger log = LoggerFactory.getLogger(ClassNameResource.class);

    private static final String ENTITY_NAME = "className";

    private final ClassNameRepository classNameRepository;

    public ClassNameResource(ClassNameRepository classNameRepository) {
        this.classNameRepository = classNameRepository;
    }

    /**
     * POST  /class-names : Create a new className.
     *
     * @param className the className to create
     * @return the ResponseEntity with status 201 (Created) and with body the new className, or with status 400 (Bad Request) if the className has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/class-names")
    @Timed
    public ResponseEntity<ClassName> createClassName(@RequestBody ClassName className) throws URISyntaxException {
        log.debug("REST request to save ClassName : {}", className);
        if (className.getId() != null) {
            throw new BadRequestAlertException("A new className cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClassName result = classNameRepository.save(className);
        return ResponseEntity.created(new URI("/api/class-names/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /class-names : Updates an existing className.
     *
     * @param className the className to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated className,
     * or with status 400 (Bad Request) if the className is not valid,
     * or with status 500 (Internal Server Error) if the className couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/class-names")
    @Timed
    public ResponseEntity<ClassName> updateClassName(@RequestBody ClassName className) throws URISyntaxException {
        log.debug("REST request to update ClassName : {}", className);
        if (className.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClassName result = classNameRepository.save(className);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, className.getId().toString()))
            .body(result);
    }

    /**
     * GET  /class-names : get all the classNames.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of classNames in body
     */
    @GetMapping("/class-names")
    @Timed
    public List<ClassName> getAllClassNames() {
        log.debug("REST request to get all ClassNames");
        return classNameRepository.findAll();
    }

    /**
     * GET  /class-names/:id : get the "id" className.
     *
     * @param id the id of the className to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the className, or with status 404 (Not Found)
     */
    @GetMapping("/class-names/{id}")
    @Timed
    public ResponseEntity<ClassName> getClassName(@PathVariable Long id) {
        log.debug("REST request to get ClassName : {}", id);
        Optional<ClassName> className = classNameRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(className);
    }

    /**
     * DELETE  /class-names/:id : delete the "id" className.
     *
     * @param id the id of the className to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/class-names/{id}")
    @Timed
    public ResponseEntity<Void> deleteClassName(@PathVariable Long id) {
        log.debug("REST request to delete ClassName : {}", id);

        classNameRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
