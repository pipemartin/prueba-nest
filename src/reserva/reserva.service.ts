import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './reserva.entity';
import { Repository } from 'typeorm';
import { HabitacionService } from 'src/habitacion/habitacion.service';
import { CreateReservaDto } from 'src/dto/rerserva.dto';

@Injectable()
export class ReservaService {
    constructor(@InjectRepository(Reserva) private reservaRepository: Repository<Reserva>, 
    private habitacionService: HabitacionService ){
    }
    // funcion de crear reservacion
    async createReserva(reservaBody: CreateReservaDto){
        const horaInicio = reservaBody.horaInicio
        const habitacionFound = await this.habitacionService.getHabitacion(reservaBody.roomId)
        const reservaFound = await this.reservaRepository.findOne({
            where: {
                horaInicio
            }
        })
        // validacion de si encuentra una reserva por su inicio de hora y si same id lanza una excepcion
        if(reservaFound && reservaBody.roomId == reservaFound.roomId ) throw new HttpException("Occupied room", HttpStatus.NOT_FOUND);
        // validacion de sino encuentra la habitacion lanza una excepcion
        if(!habitacionFound) throw new HttpException("Room not found", HttpStatus.NOT_FOUND);
        // validacion del estado que se encuentra la habitacion si esta ocupado lanza un excepcion y sino continua la ejucion del codigo
        if(habitacionFound.estado === 'Ocupado') throw new HttpException("Room's unavailable ", HttpStatus.NOT_FOUND);
        
        const newReserva = this.reservaRepository.create(reservaBody)
        return this.reservaRepository.save(newReserva)
    }
    // funcion de listar reservacion
    getReservas(){
        return this.reservaRepository.find()
    }

}
