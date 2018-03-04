package capstone.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the StoreSKU entity.
 */
public class StoreSKUDTO implements Serializable {

    private Long id;

    private Integer quantity;

    private Long storeIdId;

    private Long skuIdId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getStoreIdId() {
        return storeIdId;
    }

    public void setStoreIdId(Long storeId) {
        this.storeIdId = storeId;
    }

    public Long getSkuIdId() {
        return skuIdId;
    }

    public void setSkuIdId(Long sKUId) {
        this.skuIdId = sKUId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StoreSKUDTO storeSKUDTO = (StoreSKUDTO) o;
        if(storeSKUDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storeSKUDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StoreSKUDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
