package bootify.hotel_api_test.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RoomsDTO {

    private Long id;

    @NotNull
    private Boolean booked;

    @NotNull
    @Size(max = 40)
    private String hotel;

    private Integer rooms;

    private Integer clientRooms;

}
