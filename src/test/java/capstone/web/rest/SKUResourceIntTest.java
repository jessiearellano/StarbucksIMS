package capstone.web.rest;

import capstone.CapstoneApp;

import capstone.domain.SKU;
import capstone.repository.SKURepository;
import capstone.service.SKUService;
import capstone.service.dto.SKUDTO;
import capstone.service.mapper.SKUMapper;
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
 * Test class for the SKUResource REST controller.
 *
 * @see SKUResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CapstoneApp.class)
public class SKUResourceIntTest {

    private static final Long DEFAULT_SKU = 1L;
    private static final Long UPDATED_SKU = 2L;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_UOM = "AAAAAAAAAA";
    private static final String UPDATED_UOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_UNITS_PER_UOM = 1;
    private static final Integer UPDATED_UNITS_PER_UOM = 2;

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final Double DEFAULT_COST = 1D;
    private static final Double UPDATED_COST = 2D;

    private static final String DEFAULT_TAGS = "AAAAAAAAAA";
    private static final String UPDATED_TAGS = "BBBBBBBBBB";

    @Autowired
    private SKURepository sKURepository;

    @Autowired
    private SKUMapper sKUMapper;

    @Autowired
    private SKUService sKUService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSKUMockMvc;

    private SKU sKU;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SKUResource sKUResource = new SKUResource(sKUService);
        this.restSKUMockMvc = MockMvcBuilders.standaloneSetup(sKUResource)
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
    public static SKU createEntity(EntityManager em) {
        SKU sKU = new SKU()
            .sku(DEFAULT_SKU)
            .name(DEFAULT_NAME)
            .uom(DEFAULT_UOM)
            .unitsPerUom(DEFAULT_UNITS_PER_UOM)
            .category(DEFAULT_CATEGORY)
            .cost(DEFAULT_COST)
            .tags(DEFAULT_TAGS);
        return sKU;
    }

    @Before
    public void initTest() {
        sKU = createEntity(em);
    }

    @Test
    @Transactional
    public void createSKU() throws Exception {
        int databaseSizeBeforeCreate = sKURepository.findAll().size();

        // Create the SKU
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);
        restSKUMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isCreated());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeCreate + 1);
        SKU testSKU = sKUList.get(sKUList.size() - 1);
        assertThat(testSKU.getSku()).isEqualTo(DEFAULT_SKU);
        assertThat(testSKU.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSKU.getUom()).isEqualTo(DEFAULT_UOM);
        assertThat(testSKU.getUnitsPerUom()).isEqualTo(DEFAULT_UNITS_PER_UOM);
        assertThat(testSKU.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testSKU.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testSKU.getTags()).isEqualTo(DEFAULT_TAGS);
    }

    @Test
    @Transactional
    public void createSKUWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sKURepository.findAll().size();

        // Create the SKU with an existing ID
        sKU.setId(1L);
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSKUMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSkuIsRequired() throws Exception {
        int databaseSizeBeforeTest = sKURepository.findAll().size();
        // set the field null
        sKU.setSku(null);

        // Create the SKU, which fails.
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);

        restSKUMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isBadRequest());

        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSKUS() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);

        // Get all the sKUList
        restSKUMockMvc.perform(get("/api/skus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sKU.getId().intValue())))
            .andExpect(jsonPath("$.[*].sku").value(hasItem(DEFAULT_SKU.intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].uom").value(hasItem(DEFAULT_UOM.toString())))
            .andExpect(jsonPath("$.[*].unitsPerUom").value(hasItem(DEFAULT_UNITS_PER_UOM)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].tags").value(hasItem(DEFAULT_TAGS.toString())));
    }

    @Test
    @Transactional
    public void getSKU() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);

        // Get the sKU
        restSKUMockMvc.perform(get("/api/skus/{id}", sKU.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sKU.getId().intValue()))
            .andExpect(jsonPath("$.sku").value(DEFAULT_SKU.intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.uom").value(DEFAULT_UOM.toString()))
            .andExpect(jsonPath("$.unitsPerUom").value(DEFAULT_UNITS_PER_UOM))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.doubleValue()))
            .andExpect(jsonPath("$.tags").value(DEFAULT_TAGS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSKU() throws Exception {
        // Get the sKU
        restSKUMockMvc.perform(get("/api/skus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSKU() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);
        int databaseSizeBeforeUpdate = sKURepository.findAll().size();

        // Update the sKU
        SKU updatedSKU = sKURepository.findOne(sKU.getId());
        // Disconnect from session so that the updates on updatedSKU are not directly saved in db
        em.detach(updatedSKU);
        updatedSKU
            .sku(UPDATED_SKU)
            .name(UPDATED_NAME)
            .uom(UPDATED_UOM)
            .unitsPerUom(UPDATED_UNITS_PER_UOM)
            .category(UPDATED_CATEGORY)
            .cost(UPDATED_COST)
            .tags(UPDATED_TAGS);
        SKUDTO sKUDTO = sKUMapper.toDto(updatedSKU);

        restSKUMockMvc.perform(put("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isOk());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeUpdate);
        SKU testSKU = sKUList.get(sKUList.size() - 1);
        assertThat(testSKU.getSku()).isEqualTo(UPDATED_SKU);
        assertThat(testSKU.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSKU.getUom()).isEqualTo(UPDATED_UOM);
        assertThat(testSKU.getUnitsPerUom()).isEqualTo(UPDATED_UNITS_PER_UOM);
        assertThat(testSKU.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testSKU.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testSKU.getTags()).isEqualTo(UPDATED_TAGS);
    }

    @Test
    @Transactional
    public void updateNonExistingSKU() throws Exception {
        int databaseSizeBeforeUpdate = sKURepository.findAll().size();

        // Create the SKU
        SKUDTO sKUDTO = sKUMapper.toDto(sKU);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSKUMockMvc.perform(put("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sKUDTO)))
            .andExpect(status().isCreated());

        // Validate the SKU in the database
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSKU() throws Exception {
        // Initialize the database
        sKURepository.saveAndFlush(sKU);
        int databaseSizeBeforeDelete = sKURepository.findAll().size();

        // Get the sKU
        restSKUMockMvc.perform(delete("/api/skus/{id}", sKU.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SKU> sKUList = sKURepository.findAll();
        assertThat(sKUList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SKU.class);
        SKU sKU1 = new SKU();
        sKU1.setId(1L);
        SKU sKU2 = new SKU();
        sKU2.setId(sKU1.getId());
        assertThat(sKU1).isEqualTo(sKU2);
        sKU2.setId(2L);
        assertThat(sKU1).isNotEqualTo(sKU2);
        sKU1.setId(null);
        assertThat(sKU1).isNotEqualTo(sKU2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SKUDTO.class);
        SKUDTO sKUDTO1 = new SKUDTO();
        sKUDTO1.setId(1L);
        SKUDTO sKUDTO2 = new SKUDTO();
        assertThat(sKUDTO1).isNotEqualTo(sKUDTO2);
        sKUDTO2.setId(sKUDTO1.getId());
        assertThat(sKUDTO1).isEqualTo(sKUDTO2);
        sKUDTO2.setId(2L);
        assertThat(sKUDTO1).isNotEqualTo(sKUDTO2);
        sKUDTO1.setId(null);
        assertThat(sKUDTO1).isNotEqualTo(sKUDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sKUMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sKUMapper.fromId(null)).isNull();
    }
}
