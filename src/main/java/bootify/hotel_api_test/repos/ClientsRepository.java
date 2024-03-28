package bootify.hotel_api_test.repos;

import bootify.hotel_api_test.domain.Clients;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClientsRepository extends JpaRepository<Clients, Integer> {
}
