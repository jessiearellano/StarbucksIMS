package capstone.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A StoreSKU.
 */
@Entity
@Table(name = "store_sku")
public class StoreSKU implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    private Store storeId;

    @ManyToOne
    private SKU skuId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public StoreSKU quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Store getStoreId() {
        return storeId;
    }

    public StoreSKU storeId(Store store) {
        this.storeId = store;
        return this;
    }

    public void setStoreId(Store store) {
        this.storeId = store;
    }

    public SKU getSkuId() {
        return skuId;
    }

    public StoreSKU skuId(SKU sKU) {
        this.skuId = sKU;
        return this;
    }

    public void setSkuId(SKU sKU) {
        this.skuId = sKU;
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
        StoreSKU storeSKU = (StoreSKU) o;
        if (storeSKU.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storeSKU.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StoreSKU{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
