package bootify.hotel_api_test.rest;

import bootify.hotel_api_test.model.ClientsDTO;
import bootify.hotel_api_test.service.ClientsService;
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
@RequestMapping(value = "/api/clientss", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientsResource {

    private final ClientsService clientsService;

    public ClientsResource(final ClientsService clientsService) {
        this.clientsService = clientsService;
    }

    @GetMapping
    public ResponseEntity<List<ClientsDTO>> getAllClientss() {
        return ResponseEntity.ok(clientsService.findAll());
    }

    @GetMapping("/{cpfClient}")
    public ResponseEntity<ClientsDTO> getClients(
            @PathVariable(name = "cpfClient") final Integer cpfClient) {
        return ResponseEntity.ok(clientsService.get(cpfClient));
    }

    @PostMapping
    public ResponseEntity<Integer> createClients(@RequestBody @Valid final ClientsDTO clientsDTO) {
        final Integer createdCpfClient = clientsService.create(clientsDTO);
        return new ResponseEntity<>(createdCpfClient, HttpStatus.CREATED);
    }

    @PutMapping("/{cpfClient}")
    public ResponseEntity<Integer> updateClients(
            @PathVariable(name = "cpfClient") final Integer cpfClient,
            @RequestBody @Valid final ClientsDTO clientsDTO) {
        clientsService.update(cpfClient, clientsDTO);
        return ResponseEntity.ok(cpfClient);
    }

    @DeleteMapping("/{cpfClient}")
    public ResponseEntity<Void> deleteClients(
            @PathVariable(name = "cpfClient") final Integer cpfClient) {
        final ReferencedWarning referencedWarning = clientsService.getReferencedWarning(cpfClient);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        clientsService.delete(cpfClient);
        return ResponseEntity.noContent().build();
    }

}
