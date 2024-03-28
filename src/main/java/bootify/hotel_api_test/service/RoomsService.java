package bootify.hotel_api_test.service;

import bootify.hotel_api_test.domain.Clients;
import bootify.hotel_api_test.domain.Hotels;
import bootify.hotel_api_test.domain.Rooms;
import bootify.hotel_api_test.model.RoomsDTO;
import bootify.hotel_api_test.repos.ClientsRepository;
import bootify.hotel_api_test.repos.HotelsRepository;
import bootify.hotel_api_test.repos.RoomsRepository;
import bootify.hotel_api_test.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class RoomsService {

    private final RoomsRepository roomsRepository;
    private final HotelsRepository hotelsRepository;
    private final ClientsRepository clientsRepository;

    public RoomsService(final RoomsRepository roomsRepository,
            final HotelsRepository hotelsRepository, final ClientsRepository clientsRepository) {
        this.roomsRepository = roomsRepository;
        this.hotelsRepository = hotelsRepository;
        this.clientsRepository = clientsRepository;
    }

    public List<RoomsDTO> findAll() {
        final List<Rooms> roomses = roomsRepository.findAll(Sort.by("id"));
        return roomses.stream()
                .map(rooms -> mapToDTO(rooms, new RoomsDTO()))
                .toList();
    }

    public RoomsDTO get(final Long id) {
        return roomsRepository.findById(id)
                .map(rooms -> mapToDTO(rooms, new RoomsDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final RoomsDTO roomsDTO) {
        final Rooms rooms = new Rooms();
        mapToEntity(roomsDTO, rooms);
        return roomsRepository.save(rooms).getId();
    }

    public void update(final Long id, final RoomsDTO roomsDTO) {
        final Rooms rooms = roomsRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(roomsDTO, rooms);
        roomsRepository.save(rooms);
    }

    public void delete(final Long id) {
        roomsRepository.deleteById(id);
    }

    private RoomsDTO mapToDTO(final Rooms rooms, final RoomsDTO roomsDTO) {
        roomsDTO.setId(rooms.getId());
        roomsDTO.setBooked(rooms.getBooked());
        roomsDTO.setHotel(rooms.getHotel());
        roomsDTO.setRooms(rooms.getRooms() == null ? null : rooms.getRooms().getIdHotel());
        roomsDTO.setClientRooms(rooms.getClientRooms() == null ? null : rooms.getClientRooms().getCpfClient());
        return roomsDTO;
    }

    private Rooms mapToEntity(final RoomsDTO roomsDTO, final Rooms rooms) {
        rooms.setBooked(roomsDTO.getBooked());
        rooms.setHotel(roomsDTO.getHotel());
        final Hotels rooms = roomsDTO.getRooms() == null ? null : hotelsRepository.findById(roomsDTO.getRooms())
                .orElseThrow(() -> new NotFoundException("rooms not found"));
        rooms.setRooms(rooms);
        final Clients clientRooms = roomsDTO.getClientRooms() == null ? null : clientsRepository.findById(roomsDTO.getClientRooms())
                .orElseThrow(() -> new NotFoundException("clientRooms not found"));
        rooms.setClientRooms(clientRooms);
        return rooms;
    }

}
