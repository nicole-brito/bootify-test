package bootify.hotel_api_test.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Rooms {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Boolean booked;

    @Column(nullable = false, length = 40)
    private String hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rooms_id")
    private Hotels rooms;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_rooms_id")
    private Clients clientRooms;

}
