package bootify.hotel_api_test.repos;

import bootify.hotel_api_test.domain.Clients;
import bootify.hotel_api_test.domain.Hotels;
import bootify.hotel_api_test.domain.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoomsRepository extends JpaRepository<Rooms, Long> {

    Rooms findFirstByRooms(Hotels hotels);

    Rooms findFirstByClientRooms(Clients clients);

}
