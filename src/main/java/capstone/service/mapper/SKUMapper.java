package capstone.service.mapper;

import capstone.domain.*;
import capstone.service.dto.SKUDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SKU and its DTO SKUDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SKUMapper extends EntityMapper<SKUDTO, SKU> {


    @Mapping(target = "skus", ignore = true)
    SKU toEntity(SKUDTO sKUDTO);

    default SKU fromId(Long id) {
        if (id == null) {
            return null;
        }
        SKU sKU = new SKU();
        sKU.setId(id);
        return sKU;
    }
}
