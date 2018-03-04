package capstone.service;

import capstone.service.dto.SKUDTO;
import java.util.List;

/**
 * Service Interface for managing SKU.
 */
public interface SKUService {

    /**
     * Save a sKU.
     *
     * @param sKUDTO the entity to save
     * @return the persisted entity
     */
    SKUDTO save(SKUDTO sKUDTO);

    /**
     * Get all the sKUS.
     *
     * @return the list of entities
     */
    List<SKUDTO> findAll();

    /**
     * Get the "id" sKU.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SKUDTO findOne(Long id);

    /**
     * Delete the "id" sKU.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
