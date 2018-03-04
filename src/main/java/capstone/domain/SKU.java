package capstone.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SKU.
 */
@Entity
@Table(name = "sku")
public class SKU implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sku", nullable = false)
    private Long sku;

    @Column(name = "name")
    private String name;

    @Column(name = "uom")
    private String uom;

    @Column(name = "units_per_uom")
    private Integer unitsPerUom;

    @Column(name = "category")
    private String category;

    @Column(name = "jhi_cost")
    private Double cost;

    @Column(name = "tags")
    private String tags;

    @OneToMany(mappedBy = "skuId")
    @JsonIgnore
    private Set<StoreSKU> skus = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSku() {
        return sku;
    }

    public SKU sku(Long sku) {
        this.sku = sku;
        return this;
    }

    public void setSku(Long sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public SKU name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUom() {
        return uom;
    }

    public SKU uom(String uom) {
        this.uom = uom;
        return this;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Integer getUnitsPerUom() {
        return unitsPerUom;
    }

    public SKU unitsPerUom(Integer unitsPerUom) {
        this.unitsPerUom = unitsPerUom;
        return this;
    }

    public void setUnitsPerUom(Integer unitsPerUom) {
        this.unitsPerUom = unitsPerUom;
    }

    public String getCategory() {
        return category;
    }

    public SKU category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getCost() {
        return cost;
    }

    public SKU cost(Double cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getTags() {
        return tags;
    }

    public SKU tags(String tags) {
        this.tags = tags;
        return this;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Set<StoreSKU> getSkus() {
        return skus;
    }

    public SKU skus(Set<StoreSKU> storeSKUS) {
        this.skus = storeSKUS;
        return this;
    }

    public SKU addSku(StoreSKU storeSKU) {
        this.skus.add(storeSKU);
        storeSKU.setSkuId(this);
        return this;
    }

    public SKU removeSku(StoreSKU storeSKU) {
        this.skus.remove(storeSKU);
        storeSKU.setSkuId(null);
        return this;
    }

    public void setSkus(Set<StoreSKU> storeSKUS) {
        this.skus = storeSKUS;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SKU sKU = (SKU) o;
        if (sKU.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sKU.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SKU{" +
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
