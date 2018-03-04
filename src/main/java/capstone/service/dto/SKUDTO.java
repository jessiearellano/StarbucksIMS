package capstone.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SKU entity.
 */
public class SKUDTO implements Serializable {

    private Long id;

    @NotNull
    private Long sku;

    private String name;

    private String uom;

    private Integer unitsPerUom;

    private String category;

    private Double cost;

    private String tags;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSku() {
        return sku;
    }

    public void setSku(Long sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Integer getUnitsPerUom() {
        return unitsPerUom;
    }

    public void setUnitsPerUom(Integer unitsPerUom) {
        this.unitsPerUom = unitsPerUom;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SKUDTO sKUDTO = (SKUDTO) o;
        if(sKUDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sKUDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SKUDTO{" +
            "id=" + getId() +
            ", sku=" + getSku() +
            ", name='" + getName() + "'" +
            ", uom='" + getUom() + "'" +
            ", unitsPerUom=" + getUnitsPerUom() +
            ", category='" + getCategory() + "'" +
            ", cost=" + getCost() +
            ", tags='" + getTags() + "'" +
            "}";
    }
}
