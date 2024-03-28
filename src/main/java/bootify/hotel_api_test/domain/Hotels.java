package bootify.hotel_api_test.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Hotels {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHotel;

    @Column(nullable = false)
    private Boolean reserved;

    @Column(nullable = false, unique = true, length = 40)
    private String nameHotel;

    @Column(nullable = false, length = 60)
    private String adressHotel;

    @Column
    private Double priceHotel;

    @Column(nullable = false)
    private Integer phoneHotel;

    @Column(nullable = false)
    private Integer ratingHotel;

    @OneToMany(mappedBy = "rooms")
    private Set<Rooms> hotels;

}
