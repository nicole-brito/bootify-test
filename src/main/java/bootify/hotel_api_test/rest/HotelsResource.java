package bootify.hotel_api_test.rest;

import bootify.hotel_api_test.model.HotelsDTO;
import bootify.hotel_api_test.service.HotelsService;
import bootify.hotel_api_test.util.ReferencedException;
import bootify.hotel_api_test.util.ReferencedWarning;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/hotelss", produces = MediaType.APPLICATION_JSON_VALUE)
public class HotelsResource {

    private final HotelsService hotelsService;

    public HotelsResource(final HotelsService hotelsService) {
        this.hotelsService = hotelsService;
    }

    @GetMapping
    public ResponseEntity<List<HotelsDTO>> getAllHotelss() {
        return ResponseEntity.ok(hotelsService.findAll());
    }

    @GetMapping("/{idHotel}")
    public ResponseEntity<HotelsDTO> getHotels(
            @PathVariable(name = "idHotel") final Integer idHotel) {
        return ResponseEntity.ok(hotelsService.get(idHotel));
    }

    @PostMapping
    public ResponseEntity<Integer> createHotels(@RequestBody @Valid final HotelsDTO hotelsDTO) {
        final Integer createdIdHotel = hotelsService.create(hotelsDTO);
        return new ResponseEntity<>(createdIdHotel, HttpStatus.CREATED);
    }

    @PutMapping("/{idHotel}")
    public ResponseEntity<Integer> updateHotels(
            @PathVariable(name = "idHotel") final Integer idHotel,
            @RequestBody @Valid final HotelsDTO hotelsDTO) {
        hotelsService.update(idHotel, hotelsDTO);
        return ResponseEntity.ok(idHotel);
    }

    @DeleteMapping("/{idHotel}")
    public ResponseEntity<Void> deleteHotels(
            @PathVariable(name = "idHotel") final Integer idHotel) {
        final ReferencedWarning referencedWarning = hotelsService.getReferencedWarning(idHotel);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        hotelsService.delete(idHotel);
        return ResponseEntity.noContent().build();
    }

}
