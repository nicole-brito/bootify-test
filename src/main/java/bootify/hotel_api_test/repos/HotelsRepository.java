package bootify.hotel_api_test.repos;

import bootify.hotel_api_test.domain.Hotels;
import org.springframework.data.jpa.repository.JpaRepository;


public interface HotelsRepository extends JpaRepository<Hotels, Integer> {

    boolean existsByNameHotelIgnoreCase(String nameHotel);

}
