package capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import capstone.service.SKUService;
import capstone.web.rest.errors.BadRequestAlertException;
import capstone.web.rest.util.HeaderUtil;
import capstone.service.dto.SKUDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SKU.
 */
@RestController
@RequestMapping("/api")
public class SKUResource {

    private final Logger log = LoggerFactory.getLogger(SKUResource.class);

    private static final String ENTITY_NAME = "sKU";

    private final SKUService sKUService;

    public SKUResource(SKUService sKUService) {
        this.sKUService = sKUService;
    }

    /**
     * POST  /skus : Create a new sKU.
     *
     * @param sKUDTO the sKUDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sKUDTO, or with status 400 (Bad Request) if the sKU has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/skus")
    @Timed
    public ResponseEntity<SKUDTO> createSKU(@Valid @RequestBody SKUDTO sKUDTO) throws URISyntaxException {
        log.debug("REST request to save SKU : {}", sKUDTO);
        if (sKUDTO.getId() != null) {
            throw new BadRequestAlertException("A new sKU cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SKUDTO result = sKUService.save(sKUDTO);
        return ResponseEntity.created(new URI("/api/skus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /skus : Updates an existing sKU.
     *
     * @param sKUDTO the sKUDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sKUDTO,
     * or with status 400 (Bad Request) if the sKUDTO is not valid,
     * or with status 500 (Internal Server Error) if the sKUDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/skus")
    @Timed
    public ResponseEntity<SKUDTO> updateSKU(@Valid @RequestBody SKUDTO sKUDTO) throws URISyntaxException {
        log.debug("REST request to update SKU : {}", sKUDTO);
        if (sKUDTO.getId() == null) {
            return createSKU(sKUDTO);
        }
        SKUDTO result = sKUService.save(sKUDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sKUDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /skus : get all the sKUS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sKUS in body
     */
    @GetMapping("/skus")
    @Timed
    public List<SKUDTO> getAllSKUS() {
        log.debug("REST request to get all SKUS");
        return sKUService.findAll();
        }

    /**
     * GET  /skus/:id : get the "id" sKU.
     *
     * @param id the id of the sKUDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sKUDTO, or with status 404 (Not Found)
     */
    @GetMapping("/skus/{id}")
    @Timed
    public ResponseEntity<SKUDTO> getSKU(@PathVariable Long id) {
        log.debug("REST request to get SKU : {}", id);
        SKUDTO sKUDTO = sKUService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sKUDTO));
    }

    /**
     * DELETE  /skus/:id : delete the "id" sKU.
     *
     * @param id the id of the sKUDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/skus/{id}")
    @Timed
    public ResponseEntity<Void> deleteSKU(@PathVariable Long id) {
        log.debug("REST request to delete SKU : {}", id);
        sKUService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
