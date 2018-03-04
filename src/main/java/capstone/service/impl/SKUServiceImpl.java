package capstone.service.impl;

import capstone.service.SKUService;
import capstone.domain.SKU;
import capstone.repository.SKURepository;
import capstone.service.dto.SKUDTO;
import capstone.service.mapper.SKUMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SKU.
 */
@Service
@Transactional
public class SKUServiceImpl implements SKUService {

    private final Logger log = LoggerFactory.getLogger(SKUServiceImpl.class);

    private final SKURepository sKURepository;

    private final SKUMapper sKUMapper;

    public SKUServiceImpl(SKURepository sKURepository, SKUMapper sKUMapper) {
        this.sKURepository = sKURepository;
        this.sKUMapper = sKUMapper;
    }

    /**
     * Save a sKU.
     *
     * @param sKUDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SKUDTO save(SKUDTO sKUDTO) {
        log.debug("Request to save SKU : {}", sKUDTO);
        SKU sKU = sKUMapper.toEntity(sKUDTO);
        sKU = sKURepository.save(sKU);
        return sKUMapper.toDto(sKU);
    }

    /**
     * Get all the sKUS.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SKUDTO> findAll() {
        log.debug("Request to get all SKUS");
        return sKURepository.findAll().stream()
            .map(sKUMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one sKU by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SKUDTO findOne(Long id) {
        log.debug("Request to get SKU : {}", id);
        SKU sKU = sKURepository.findOne(id);
        return sKUMapper.toDto(sKU);
    }

    /**
     * Delete the sKU by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SKU : {}", id);
        sKURepository.delete(id);
    }
}
