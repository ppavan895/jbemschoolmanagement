package com.school.management.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.school.management.domain.Attendence;
import com.school.management.repository.AttendenceRepository;
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
 * REST controller for managing Attendence.
 */
@RestController
@RequestMapping("/api")
public class AttendenceResource {

    private final Logger log = LoggerFactory.getLogger(AttendenceResource.class);

    private static final String ENTITY_NAME = "attendence";

    private final AttendenceRepository attendenceRepository;

    public AttendenceResource(AttendenceRepository attendenceRepository) {
        this.attendenceRepository = attendenceRepository;
    }

    /**
     * POST  /attendences : Create a new attendence.
     *
     * @param attendence the attendence to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attendence, or with status 400 (Bad Request) if the attendence has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attendences")
    @Timed
    public ResponseEntity<Attendence> createAttendence(@RequestBody Attendence attendence) throws URISyntaxException {
        log.debug("REST request to save Attendence : {}", attendence);
        if (attendence.getId() != null) {
            throw new BadRequestAlertException("A new attendence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Attendence result = attendenceRepository.save(attendence);
        return ResponseEntity.created(new URI("/api/attendences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attendences : Updates an existing attendence.
     *
     * @param attendence the attendence to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attendence,
     * or with status 400 (Bad Request) if the attendence is not valid,
     * or with status 500 (Internal Server Error) if the attendence couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attendences")
    @Timed
    public ResponseEntity<Attendence> updateAttendence(@RequestBody Attendence attendence) throws URISyntaxException {
        log.debug("REST request to update Attendence : {}", attendence);
        if (attendence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Attendence result = attendenceRepository.save(attendence);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attendence.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attendences : get all the attendences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of attendences in body
     */
    @GetMapping("/attendences")
    @Timed
    public List<Attendence> getAllAttendences() {
        log.debug("REST request to get all Attendences");
        return attendenceRepository.findAll();
    }

    /**
     * GET  /attendences/:id : get the "id" attendence.
     *
     * @param id the id of the attendence to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attendence, or with status 404 (Not Found)
     */
    @GetMapping("/attendences/{id}")
    @Timed
    public ResponseEntity<Attendence> getAttendence(@PathVariable Long id) {
        log.debug("REST request to get Attendence : {}", id);
        Optional<Attendence> attendence = attendenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(attendence);
    }

    /**
     * DELETE  /attendences/:id : delete the "id" attendence.
     *
     * @param id the id of the attendence to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attendences/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttendence(@PathVariable Long id) {
        log.debug("REST request to delete Attendence : {}", id);

        attendenceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
