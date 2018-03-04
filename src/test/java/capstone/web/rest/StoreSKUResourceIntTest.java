package capstone.web.rest;

import capstone.CapstoneApp;

import capstone.domain.StoreSKU;
import capstone.repository.StoreSKURepository;
import capstone.service.dto.StoreSKUDTO;
import capstone.service.mapper.StoreSKUMapper;
import capstone.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static capstone.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StoreSKUResource REST controller.
 *
 * @see StoreSKUResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CapstoneApp.class)
public class StoreSKUResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private StoreSKURepository storeSKURepository;

    @Autowired
    private StoreSKUMapper storeSKUMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStoreSKUMockMvc;

    private StoreSKU storeSKU;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StoreSKUResource storeSKUResource = new StoreSKUResource(storeSKURepository, storeSKUMapper);
        this.restStoreSKUMockMvc = MockMvcBuilders.standaloneSetup(storeSKUResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StoreSKU createEntity(EntityManager em) {
        StoreSKU storeSKU = new StoreSKU()
            .quantity(DEFAULT_QUANTITY);
        return storeSKU;
    }

    @Before
    public void initTest() {
        storeSKU = createEntity(em);
    }

    @Test
    @Transactional
    public void createStoreSKU() throws Exception {
        int databaseSizeBeforeCreate = storeSKURepository.findAll().size();

        // Create the StoreSKU
        StoreSKUDTO storeSKUDTO = storeSKUMapper.toDto(storeSKU);
        restStoreSKUMockMvc.perform(post("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeSKUDTO)))
            .andExpect(status().isCreated());

        // Validate the StoreSKU in the database
        List<StoreSKU> storeSKUList = storeSKURepository.findAll();
        assertThat(storeSKUList).hasSize(databaseSizeBeforeCreate + 1);
        StoreSKU testStoreSKU = storeSKUList.get(storeSKUList.size() - 1);
        assertThat(testStoreSKU.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createStoreSKUWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storeSKURepository.findAll().size();

        // Create the StoreSKU with an existing ID
        storeSKU.setId(1L);
        StoreSKUDTO storeSKUDTO = storeSKUMapper.toDto(storeSKU);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoreSKUMockMvc.perform(post("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeSKUDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StoreSKU in the database
        List<StoreSKU> storeSKUList = storeSKURepository.findAll();
        assertThat(storeSKUList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStoreSKUS() throws Exception {
        // Initialize the database
        storeSKURepository.saveAndFlush(storeSKU);

        // Get all the storeSKUList
        restStoreSKUMockMvc.perform(get("/api/store-skus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeSKU.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void getStoreSKU() throws Exception {
        // Initialize the database
        storeSKURepository.saveAndFlush(storeSKU);

        // Get the storeSKU
        restStoreSKUMockMvc.perform(get("/api/store-skus/{id}", storeSKU.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(storeSKU.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingStoreSKU() throws Exception {
        // Get the storeSKU
        restStoreSKUMockMvc.perform(get("/api/store-skus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStoreSKU() throws Exception {
        // Initialize the database
        storeSKURepository.saveAndFlush(storeSKU);
        int databaseSizeBeforeUpdate = storeSKURepository.findAll().size();

        // Update the storeSKU
        StoreSKU updatedStoreSKU = storeSKURepository.findOne(storeSKU.getId());
        // Disconnect from session so that the updates on updatedStoreSKU are not directly saved in db
        em.detach(updatedStoreSKU);
        updatedStoreSKU
            .quantity(UPDATED_QUANTITY);
        StoreSKUDTO storeSKUDTO = storeSKUMapper.toDto(updatedStoreSKU);

        restStoreSKUMockMvc.perform(put("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeSKUDTO)))
            .andExpect(status().isOk());

        // Validate the StoreSKU in the database
        List<StoreSKU> storeSKUList = storeSKURepository.findAll();
        assertThat(storeSKUList).hasSize(databaseSizeBeforeUpdate);
        StoreSKU testStoreSKU = storeSKUList.get(storeSKUList.size() - 1);
        assertThat(testStoreSKU.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingStoreSKU() throws Exception {
        int databaseSizeBeforeUpdate = storeSKURepository.findAll().size();

        // Create the StoreSKU
        StoreSKUDTO storeSKUDTO = storeSKUMapper.toDto(storeSKU);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStoreSKUMockMvc.perform(put("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeSKUDTO)))
            .andExpect(status().isCreated());

        // Validate the StoreSKU in the database
        List<StoreSKU> storeSKUList = storeSKURepository.findAll();
        assertThat(storeSKUList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStoreSKU() throws Exception {
        // Initialize the database
        storeSKURepository.saveAndFlush(storeSKU);
        int databaseSizeBeforeDelete = storeSKURepository.findAll().size();

        // Get the storeSKU
        restStoreSKUMockMvc.perform(delete("/api/store-skus/{id}", storeSKU.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StoreSKU> storeSKUList = storeSKURepository.findAll();
        assertThat(storeSKUList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoreSKU.class);
        StoreSKU storeSKU1 = new StoreSKU();
        storeSKU1.setId(1L);
        StoreSKU storeSKU2 = new StoreSKU();
        storeSKU2.setId(storeSKU1.getId());
        assertThat(storeSKU1).isEqualTo(storeSKU2);
        storeSKU2.setId(2L);
        assertThat(storeSKU1).isNotEqualTo(storeSKU2);
        storeSKU1.setId(null);
        assertThat(storeSKU1).isNotEqualTo(storeSKU2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoreSKUDTO.class);
        StoreSKUDTO storeSKUDTO1 = new StoreSKUDTO();
        storeSKUDTO1.setId(1L);
        StoreSKUDTO storeSKUDTO2 = new StoreSKUDTO();
        assertThat(storeSKUDTO1).isNotEqualTo(storeSKUDTO2);
        storeSKUDTO2.setId(storeSKUDTO1.getId());
        assertThat(storeSKUDTO1).isEqualTo(storeSKUDTO2);
        storeSKUDTO2.setId(2L);
        assertThat(storeSKUDTO1).isNotEqualTo(storeSKUDTO2);
        storeSKUDTO1.setId(null);
        assertThat(storeSKUDTO1).isNotEqualTo(storeSKUDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(storeSKUMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(storeSKUMapper.fromId(null)).isNull();
    }
}
