package capstone.repository;

import capstone.domain.SKU;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SKU entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SKURepository extends JpaRepository<SKU, Long> {

}
