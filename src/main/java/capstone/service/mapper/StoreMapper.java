package capstone.service.mapper;

import capstone.domain.*;
import capstone.service.dto.StoreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Store and its DTO StoreDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface StoreMapper extends EntityMapper<StoreDTO, Store> {

    @Mapping(source = "manager.id", target = "managerId")
    StoreDTO toDto(Store store);

    @Mapping(source = "managerId", target = "manager")
    @Mapping(target = "shiftSupervisors", ignore = true)
    @Mapping(target = "ids", ignore = true)
    Store toEntity(StoreDTO storeDTO);

    default Store fromId(Long id) {
        if (id == null) {
            return null;
        }
        Store store = new Store();
        store.setId(id);
        return store;
    }
}
