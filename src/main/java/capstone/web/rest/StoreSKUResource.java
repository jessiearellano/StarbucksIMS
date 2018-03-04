package capstone.web.rest;

import com.codahale.metrics.annotation.Timed;
import capstone.domain.StoreSKU;

import capstone.repository.StoreSKURepository;
import capstone.web.rest.errors.BadRequestAlertException;
import capstone.web.rest.util.HeaderUtil;
import capstone.service.dto.StoreSKUDTO;
import capstone.service.mapper.StoreSKUMapper;
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
 * REST controller for managing StoreSKU.
 */
@RestController
@RequestMapping("/api")
public class StoreSKUResource {

    private final Logger log = LoggerFactory.getLogger(StoreSKUResource.class);

    private static final String ENTITY_NAME = "storeSKU";

    private final StoreSKURepository storeSKURepository;

    private final StoreSKUMapper storeSKUMapper;

    public StoreSKUResource(StoreSKURepository storeSKURepository, StoreSKUMapper storeSKUMapper) {
        this.storeSKURepository = storeSKURepository;
        this.storeSKUMapper = storeSKUMapper;
    }

    /**
     * POST  /store-skus : Create a new storeSKU.
     *
     * @param storeSKUDTO the storeSKUDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new storeSKUDTO, or with status 400 (Bad Request) if the storeSKU has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/store-skus")
    @Timed
    public ResponseEntity<StoreSKUDTO> createStoreSKU(@RequestBody StoreSKUDTO storeSKUDTO) throws URISyntaxException {
        log.debug("REST request to save StoreSKU : {}", storeSKUDTO);
        if (storeSKUDTO.getId() != null) {
            throw new BadRequestAlertException("A new storeSKU cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StoreSKU storeSKU = storeSKUMapper.toEntity(storeSKUDTO);
        storeSKU = storeSKURepository.save(storeSKU);
        StoreSKUDTO result = storeSKUMapper.toDto(storeSKU);
        return ResponseEntity.created(new URI("/api/store-skus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /store-skus : Updates an existing storeSKU.
     *
     * @param storeSKUDTO the storeSKUDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated storeSKUDTO,
     * or with status 400 (Bad Request) if the storeSKUDTO is not valid,
     * or with status 500 (Internal Server Error) if the storeSKUDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/store-skus")
    @Timed
    public ResponseEntity<StoreSKUDTO> updateStoreSKU(@RequestBody StoreSKUDTO storeSKUDTO) throws URISyntaxException {
        log.debug("REST request to update StoreSKU : {}", storeSKUDTO);
        if (storeSKUDTO.getId() == null) {
            return createStoreSKU(storeSKUDTO);
        }
        StoreSKU storeSKU = storeSKUMapper.toEntity(storeSKUDTO);
        storeSKU = storeSKURepository.save(storeSKU);
        StoreSKUDTO result = storeSKUMapper.toDto(storeSKU);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, storeSKUDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /store-skus : get all the storeSKUS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of storeSKUS in body
     */
    @GetMapping("/store-skus")
    @Timed
    public List<StoreSKUDTO> getAllStoreSKUS() {
        log.debug("REST request to get all StoreSKUS");
        List<StoreSKU> storeSKUS = storeSKURepository.findAll();
        return storeSKUMapper.toDto(storeSKUS);
        }

    /**
     * GET  /store-skus/:id : get the "id" storeSKU.
     *
     * @param id the id of the storeSKUDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the storeSKUDTO, or with status 404 (Not Found)
     */
    @GetMapping("/store-skus/{id}")
    @Timed
    public ResponseEntity<StoreSKUDTO> getStoreSKU(@PathVariable Long id) {
        log.debug("REST request to get StoreSKU : {}", id);
        StoreSKU storeSKU = storeSKURepository.findOne(id);
        StoreSKUDTO storeSKUDTO = storeSKUMapper.toDto(storeSKU);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(storeSKUDTO));
    }

    /**
     * DELETE  /store-skus/:id : delete the "id" storeSKU.
     *
     * @param id the id of the storeSKUDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/store-skus/{id}")
    @Timed
    public ResponseEntity<Void> deleteStoreSKU(@PathVariable Long id) {
        log.debug("REST request to delete StoreSKU : {}", id);
        storeSKURepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
