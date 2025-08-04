package com.indisky.user.service.Impl;

import com.indisky.entities.Passenger;
import com.indisky.exception.ResourceNotFoundException;
import com.indisky.repository.PassengerRepository;
import com.indisky.user.dto.PassengerReqDto;
import com.indisky.user.dto.PassengerRespDto;
import com.indisky.user.service.PassengerService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository repo;

    private final ModelMapper modelMapper;

    @Override
    public String addPassengers(List<PassengerReqDto> passDto) {
        if(passDto==null || passDto.isEmpty()){
            return "No Passengers to add ";
        }
        List<Passenger> entity = new ArrayList<>();
        for (PassengerReqDto en : passDto){
            Passenger passenger=modelMapper.map(en,Passenger.class);
            entity.add(passenger);
        }
        repo.saveAll(entity);
        return "Passengers Added Successfully";
    }


    @Override
    public PassengerRespDto getSpecificPassenger(Long id) {
        Passenger entity = repo.findById(id).orElseThrow( () -> new ResourceNotFoundException("Passenger Not found") );
        return modelMapper.map(entity, PassengerRespDto.class);
    }

//    @Override
//    public List<PassengerRespDto> getAllPassengersByFlight(Long id) {
//        List<PassengerRespDto> pdto =new ArrayList<>();
//
//        List<Passenger> entity = repo.findPassengerByFlightId(id);
//
//        if(entity.isEmpty() ){
//            throw new ResourceNotFoundException("No Passengers found for flight with id " + id);
//        }
//
//        for (Passenger en : entity){
//            PassengerRespDto passdto = modelMapper.map(en, PassengerRespDto.class);
//            pdto.add(passdto);
//        }
//        return pdto;
//    }
//
//    @Override
//    public String updatePassengers(List<PassengerRespDto> passengerDtos) {
//        if(passengerDtos==null || passengerDtos.isEmpty()){
//            return "No Passengers to Update ";
//        }
//
//        List<Passenger> savePassengers = new ArrayList<>();
//
//        for (PassengerRespDto newPassenger : passengerDtos){
//
//            Passenger entity = repo.findById(newPassenger.getPassengerId()).get();
//            modelMapper.map(newPassenger, entity);
//
//            savePassengers.add(entity);
//
//        }
//
//        repo.saveAll(savePassengers);
//        return "Passengers Updated Successfully ";
//    }
}
