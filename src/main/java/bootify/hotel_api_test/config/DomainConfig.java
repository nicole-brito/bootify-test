package bootify.hotel_api_test.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("bootify.hotel_api_test.domain")
@EnableJpaRepositories("bootify.hotel_api_test.repos")
@EnableTransactionManagement
public class DomainConfig {
}
