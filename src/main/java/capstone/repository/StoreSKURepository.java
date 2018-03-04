package capstone.repository;

import capstone.domain.StoreSKU;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StoreSKU entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoreSKURepository extends JpaRepository<StoreSKU, Long> {

}
