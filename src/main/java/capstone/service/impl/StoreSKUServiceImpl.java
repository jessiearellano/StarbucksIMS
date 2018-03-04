package capstone.service.impl;

import capstone.service.StoreSKUService;
import capstone.domain.StoreSKU;
import capstone.repository.StoreSKURepository;
import capstone.service.dto.StoreSKUDTO;
import capstone.service.mapper.StoreSKUMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing StoreSKU.
 */
@Service
@Transactional
public class StoreSKUServiceImpl implements StoreSKUService {

    private final Logger log = LoggerFactory.getLogger(StoreSKUServiceImpl.class);

    private final StoreSKURepository storeSKURepository;

    private final StoreSKUMapper storeSKUMapper;

    public StoreSKUServiceImpl(StoreSKURepository storeSKURepository, StoreSKUMapper storeSKUMapper) {
        this.storeSKURepository = storeSKURepository;
        this.storeSKUMapper = storeSKUMapper;
    }

    /**
     * Save a storeSKU.
     *
     * @param storeSKUDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StoreSKUDTO save(StoreSKUDTO storeSKUDTO) {
        log.debug("Request to save StoreSKU : {}", storeSKUDTO);
        StoreSKU storeSKU = storeSKUMapper.toEntity(storeSKUDTO);
        storeSKU = storeSKURepository.save(storeSKU);
        return storeSKUMapper.toDto(storeSKU);
    }

    /**
     * Get all the storeSKUS.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<StoreSKUDTO> findAll() {
        log.debug("Request to get all StoreSKUS");
        return storeSKURepository.findAll().stream()
            .map(storeSKUMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one storeSKU by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StoreSKUDTO findOne(Long id) {
        log.debug("Request to get StoreSKU : {}", id);
        StoreSKU storeSKU = storeSKURepository.findOne(id);
        return storeSKUMapper.toDto(storeSKU);
    }

    /**
     * Delete the storeSKU by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StoreSKU : {}", id);
        storeSKURepository.delete(id);
    }
}
