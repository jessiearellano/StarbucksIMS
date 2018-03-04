package capstone.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Store.
 */
@Entity
@Table(name = "store")
public class Store implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zip")
    private String zip;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lon")
    private Double lon;

    @OneToOne
    @JoinColumn(unique = true)
    private User manager;

    @OneToMany(mappedBy = "login")
    @JsonIgnore
    private Set<User> shiftSupervisors = new HashSet<>();

    @OneToMany(mappedBy = "storeId")
    @JsonIgnore
    private Set<StoreSKU> ids = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public Store address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public Store city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public Store state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public Store zip(String zip) {
        this.zip = zip;
        return this;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Double getLat() {
        return lat;
    }

    public Store lat(Double lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLon() {
        return lon;
    }

    public Store lon(Double lon) {
        this.lon = lon;
        return this;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public User getManager() {
        return manager;
    }

    public Store manager(User user) {
        this.manager = user;
        return this;
    }

    public void setManager(User user) {
        this.manager = user;
    }

    public Set<User> getShiftSupervisors() {
        return shiftSupervisors;
    }

    public Store shiftSupervisors(Set<User> users) {
        this.shiftSupervisors = users;
        return this;
    }

    public Store addShiftSupervisors(User user) {
        this.shiftSupervisors.add(user);
//        user.setLogin(this);
        return this;
    }

    public Store removeShiftSupervisors(User user) {
        this.shiftSupervisors.remove(user);
        user.setLogin(null);
        return this;
    }

    public void setShiftSupervisors(Set<User> users) {
        this.shiftSupervisors = users;
    }

    public Set<StoreSKU> getIds() {
        return ids;
    }

    public Store ids(Set<StoreSKU> storeSKUS) {
        this.ids = storeSKUS;
        return this;
    }

    public Store addId(StoreSKU storeSKU) {
        this.ids.add(storeSKU);
        storeSKU.setStoreId(this);
        return this;
    }

    public Store removeId(StoreSKU storeSKU) {
        this.ids.remove(storeSKU);
        storeSKU.setStoreId(null);
        return this;
    }

    public void setIds(Set<StoreSKU> storeSKUS) {
        this.ids = storeSKUS;
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
        Store store = (Store) o;
        if (store.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), store.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Store{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", zip='" + getZip() + "'" +
            ", lat=" + getLat() +
            ", lon=" + getLon() +
            "}";
    }
}
