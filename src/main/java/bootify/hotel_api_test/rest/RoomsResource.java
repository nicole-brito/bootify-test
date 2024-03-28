package bootify.hotel_api_test.rest;

import bootify.hotel_api_test.domain.Clients;
import bootify.hotel_api_test.domain.Hotels;
import bootify.hotel_api_test.model.RoomsDTO;
import bootify.hotel_api_test.repos.ClientsRepository;
import bootify.hotel_api_test.repos.HotelsRepository;
import bootify.hotel_api_test.service.RoomsService;
import bootify.hotel_api_test.util.CustomCollectors;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Sort;
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
@RequestMapping(value = "/api/roomss", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoomsResource {

    private final RoomsService roomsService;
    private final HotelsRepository hotelsRepository;
    private final ClientsRepository clientsRepository;

    public RoomsResource(final RoomsService roomsService, final HotelsRepository hotelsRepository,
            final ClientsRepository clientsRepository) {
        this.roomsService = roomsService;
        this.hotelsRepository = hotelsRepository;
        this.clientsRepository = clientsRepository;
    }

    @GetMapping
    public ResponseEntity<List<RoomsDTO>> getAllRoomss() {
        return ResponseEntity.ok(roomsService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomsDTO> getRooms(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(roomsService.get(id));
    }

    @PostMapping
    public ResponseEntity<Long> createRooms(@RequestBody @Valid final RoomsDTO roomsDTO) {
        final Long createdId = roomsService.create(roomsDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateRooms(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final RoomsDTO roomsDTO) {
        roomsService.update(id, roomsDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRooms(@PathVariable(name = "id") final Long id) {
        roomsService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/roomsValues")
    public ResponseEntity<Map<Integer, String>> getRoomsValues() {
        return ResponseEntity.ok(hotelsRepository.findAll(Sort.by("idHotel"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Hotels::getIdHotel, Hotels::getNameHotel)));
    }

    @GetMapping("/clientRoomsValues")
    public ResponseEntity<Map<Integer, String>> getClientRoomsValues() {
        return ResponseEntity.ok(clientsRepository.findAll(Sort.by("cpfClient"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Clients::getCpfClient, Clients::getNameClient)));
    }

}
