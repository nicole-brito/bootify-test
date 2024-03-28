package bootify.hotel_api_test.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class HotelsDTO {

    private Integer idHotel;

    @NotNull
    private Boolean reserved;

    @NotNull
    @Size(max = 40)
    @HotelsNameHotelUnique
    private String nameHotel;

    @NotNull
    @Size(max = 60)
    private String adressHotel;

    private Double priceHotel;

    @NotNull
    private Integer phoneHotel;

    @NotNull
    private Integer ratingHotel;

}
