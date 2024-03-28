package bootify.hotel_api_test.service;

import bootify.hotel_api_test.domain.Hotels;
import bootify.hotel_api_test.domain.Rooms;
import bootify.hotel_api_test.model.HotelsDTO;
import bootify.hotel_api_test.repos.HotelsRepository;
import bootify.hotel_api_test.repos.RoomsRepository;
import bootify.hotel_api_test.util.NotFoundException;
import bootify.hotel_api_test.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class HotelsService {

    private final HotelsRepository hotelsRepository;
    private final RoomsRepository roomsRepository;

    public HotelsService(final HotelsRepository hotelsRepository,
            final RoomsRepository roomsRepository) {
        this.hotelsRepository = hotelsRepository;
        this.roomsRepository = roomsRepository;
    }

    public List<HotelsDTO> findAll() {
        final List<Hotels> hotelses = hotelsRepository.findAll(Sort.by("idHotel"));
        return hotelses.stream()
                .map(hotels -> mapToDTO(hotels, new HotelsDTO()))
                .toList();
    }

    public HotelsDTO get(final Integer idHotel) {
        return hotelsRepository.findById(idHotel)
                .map(hotels -> mapToDTO(hotels, new HotelsDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final HotelsDTO hotelsDTO) {
        final Hotels hotels = new Hotels();
        mapToEntity(hotelsDTO, hotels);
        return hotelsRepository.save(hotels).getIdHotel();
    }

    public void update(final Integer idHotel, final HotelsDTO hotelsDTO) {
        final Hotels hotels = hotelsRepository.findById(idHotel)
                .orElseThrow(NotFoundException::new);
        mapToEntity(hotelsDTO, hotels);
        hotelsRepository.save(hotels);
    }

    public void delete(final Integer idHotel) {
        hotelsRepository.deleteById(idHotel);
    }

    private HotelsDTO mapToDTO(final Hotels hotels, final HotelsDTO hotelsDTO) {
        hotelsDTO.setIdHotel(hotels.getIdHotel());
        hotelsDTO.setReserved(hotels.getReserved());
        hotelsDTO.setNameHotel(hotels.getNameHotel());
        hotelsDTO.setAdressHotel(hotels.getAdressHotel());
        hotelsDTO.setPriceHotel(hotels.getPriceHotel());
        hotelsDTO.setPhoneHotel(hotels.getPhoneHotel());
        hotelsDTO.setRatingHotel(hotels.getRatingHotel());
        return hotelsDTO;
    }

    private Hotels mapToEntity(final HotelsDTO hotelsDTO, final Hotels hotels) {
        hotels.setReserved(hotelsDTO.getReserved());
        hotels.setNameHotel(hotelsDTO.getNameHotel());
        hotels.setAdressHotel(hotelsDTO.getAdressHotel());
        hotels.setPriceHotel(hotelsDTO.getPriceHotel());
        hotels.setPhoneHotel(hotelsDTO.getPhoneHotel());
        hotels.setRatingHotel(hotelsDTO.getRatingHotel());
        return hotels;
    }

    public boolean nameHotelExists(final String nameHotel) {
        return hotelsRepository.existsByNameHotelIgnoreCase(nameHotel);
    }

    public ReferencedWarning getReferencedWarning(final Integer idHotel) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Hotels hotels = hotelsRepository.findById(idHotel)
                .orElseThrow(NotFoundException::new);
        final Rooms roomsRooms = roomsRepository.findFirstByRooms(hotels);
        if (roomsRooms != null) {
            referencedWarning.setKey("hotels.rooms.rooms.referenced");
            referencedWarning.addParam(roomsRooms.getId());
            return referencedWarning;
        }
        return null;
    }

}
