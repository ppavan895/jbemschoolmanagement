package com.school.management.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.school.management.domain.Markes;
import com.school.management.repository.MarkesRepository;
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
 * REST controller for managing Markes.
 */
@RestController
@RequestMapping("/api")
public class MarkesResource {

    private final Logger log = LoggerFactory.getLogger(MarkesResource.class);

    private static final String ENTITY_NAME = "markes";

    private final MarkesRepository markesRepository;

    public MarkesResource(MarkesRepository markesRepository) {
        this.markesRepository = markesRepository;
    }

    /**
     * POST  /markes : Create a new markes.
     *
     * @param markes the markes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new markes, or with status 400 (Bad Request) if the markes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/markes")
    @Timed
    public ResponseEntity<Markes> createMarkes(@RequestBody Markes markes) throws URISyntaxException {
        log.debug("REST request to save Markes : {}", markes);
        if (markes.getId() != null) {
            throw new BadRequestAlertException("A new markes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Markes result = markesRepository.save(markes);
        return ResponseEntity.created(new URI("/api/markes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /markes : Updates an existing markes.
     *
     * @param markes the markes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated markes,
     * or with status 400 (Bad Request) if the markes is not valid,
     * or with status 500 (Internal Server Error) if the markes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/markes")
    @Timed
    public ResponseEntity<Markes> updateMarkes(@RequestBody Markes markes) throws URISyntaxException {
        log.debug("REST request to update Markes : {}", markes);
        if (markes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Markes result = markesRepository.save(markes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, markes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /markes : get all the markes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of markes in body
     */
    @GetMapping("/markes")
    @Timed
    public List<Markes> getAllMarkes() {
        log.debug("REST request to get all Markes");
        return markesRepository.findAll();
    }

    /**
     * GET  /markes/:id : get the "id" markes.
     *
     * @param id the id of the markes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the markes, or with status 404 (Not Found)
     */
    @GetMapping("/markes/{id}")
    @Timed
    public ResponseEntity<Markes> getMarkes(@PathVariable Long id) {
        log.debug("REST request to get Markes : {}", id);
        Optional<Markes> markes = markesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(markes);
    }

    /**
     * DELETE  /markes/:id : delete the "id" markes.
     *
     * @param id the id of the markes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/markes/{id}")
    @Timed
    public ResponseEntity<Void> deleteMarkes(@PathVariable Long id) {
        log.debug("REST request to delete Markes : {}", id);

        markesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
