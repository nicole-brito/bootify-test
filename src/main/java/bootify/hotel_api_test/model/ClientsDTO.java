package bootify.hotel_api_test.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClientsDTO {

    private Integer cpfClient;

    @NotNull
    @Size(max = 40)
    private String nameClient;

    @NotNull
    private Integer phoneClient;

}
