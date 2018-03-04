package capstone.service;

import capstone.service.dto.StoreSKUDTO;
import java.util.List;

/**
 * Service Interface for managing StoreSKU.
 */
public interface StoreSKUService {

    /**
     * Save a storeSKU.
     *
     * @param storeSKUDTO the entity to save
     * @return the persisted entity
     */
    StoreSKUDTO save(StoreSKUDTO storeSKUDTO);

    /**
     * Get all the storeSKUS.
     *
     * @return the list of entities
     */
    List<StoreSKUDTO> findAll();

    /**
     * Get the "id" storeSKU.
     *
     * @param id the id of the entity
     * @return the entity
     */
    StoreSKUDTO findOne(Long id);

    /**
     * Delete the "id" storeSKU.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
