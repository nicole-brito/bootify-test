package bootify.hotel_api_test.service;

import bootify.hotel_api_test.domain.Clients;
import bootify.hotel_api_test.domain.Rooms;
import bootify.hotel_api_test.model.ClientsDTO;
import bootify.hotel_api_test.repos.ClientsRepository;
import bootify.hotel_api_test.repos.RoomsRepository;
import bootify.hotel_api_test.util.NotFoundException;
import bootify.hotel_api_test.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ClientsService {

    private final ClientsRepository clientsRepository;
    private final RoomsRepository roomsRepository;

    public ClientsService(final ClientsRepository clientsRepository,
            final RoomsRepository roomsRepository) {
        this.clientsRepository = clientsRepository;
        this.roomsRepository = roomsRepository;
    }

    public List<ClientsDTO> findAll() {
        final List<Clients> clientses = clientsRepository.findAll(Sort.by("cpfClient"));
        return clientses.stream()
                .map(clients -> mapToDTO(clients, new ClientsDTO()))
                .toList();
    }

    public ClientsDTO get(final Integer cpfClient) {
        return clientsRepository.findById(cpfClient)
                .map(clients -> mapToDTO(clients, new ClientsDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final ClientsDTO clientsDTO) {
        final Clients clients = new Clients();
        mapToEntity(clientsDTO, clients);
        return clientsRepository.save(clients).getCpfClient();
    }

    public void update(final Integer cpfClient, final ClientsDTO clientsDTO) {
        final Clients clients = clientsRepository.findById(cpfClient)
                .orElseThrow(NotFoundException::new);
        mapToEntity(clientsDTO, clients);
        clientsRepository.save(clients);
    }

    public void delete(final Integer cpfClient) {
        clientsRepository.deleteById(cpfClient);
    }

    private ClientsDTO mapToDTO(final Clients clients, final ClientsDTO clientsDTO) {
        clientsDTO.setCpfClient(clients.getCpfClient());
        clientsDTO.setNameClient(clients.getNameClient());
        clientsDTO.setPhoneClient(clients.getPhoneClient());
        return clientsDTO;
    }

    private Clients mapToEntity(final ClientsDTO clientsDTO, final Clients clients) {
        clients.setNameClient(clientsDTO.getNameClient());
        clients.setPhoneClient(clientsDTO.getPhoneClient());
        return clients;
    }

    public ReferencedWarning getReferencedWarning(final Integer cpfClient) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Clients clients = clientsRepository.findById(cpfClient)
                .orElseThrow(NotFoundException::new);
        final Rooms clientRoomsRooms = roomsRepository.findFirstByClientRooms(clients);
        if (clientRoomsRooms != null) {
            referencedWarning.setKey("clients.rooms.clientRooms.referenced");
            referencedWarning.addParam(clientRoomsRooms.getId());
            return referencedWarning;
        }
        return null;
    }

}
