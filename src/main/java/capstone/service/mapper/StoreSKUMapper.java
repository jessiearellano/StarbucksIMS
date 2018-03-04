package capstone.service.mapper;

import capstone.domain.*;
import capstone.service.dto.StoreSKUDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StoreSKU and its DTO StoreSKUDTO.
 */
@Mapper(componentModel = "spring", uses = {StoreMapper.class, SKUMapper.class})
public interface StoreSKUMapper extends EntityMapper<StoreSKUDTO, StoreSKU> {

    @Mapping(source = "storeId.id", target = "storeIdId")
    @Mapping(source = "skuId.id", target = "skuIdId")
    StoreSKUDTO toDto(StoreSKU storeSKU);

    @Mapping(source = "storeIdId", target = "storeId")
    @Mapping(source = "skuIdId", target = "skuId")
    StoreSKU toEntity(StoreSKUDTO storeSKUDTO);

    default StoreSKU fromId(Long id) {
        if (id == null) {
            return null;
        }
        StoreSKU storeSKU = new StoreSKU();
        storeSKU.setId(id);
        return storeSKU;
    }
}
