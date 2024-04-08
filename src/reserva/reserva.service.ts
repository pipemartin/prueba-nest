import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './reserva.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { HabitacionService } from 'src/habitacion/habitacion.service';
import { CreateReservaDto } from 'src/dto/rerserva.dto';

@Injectable()
export class ReservaService {
    constructor(@InjectRepository(Reserva) private reservaRepository: Repository<Reserva>, 
    private habitacionService: HabitacionService ){
    }
    // funcion de crear reservacion
    async createReserva(reservaBody: CreateReservaDto){
        try {
            const horaInicio = reservaBody.horaInicio
            const horaFin = reservaBody.horaFin
            const reservaFound = await this.reservaRepository.find({
                where: {
                    roomId: reservaBody.roomId,
                    horaInicio: LessThanOrEqual(horaFin), // Comprobar si alguna reserva existente comienza antes o al mismo tiempo que la nueva reserva termina
                    horaFin: MoreThanOrEqual(horaInicio)
                }
            })
            // validacion de si encuentra una reserva por su inicio de hora y si same id lanza una excepcion
            if(reservaFound.length > 0) throw new HttpException("Occupied room", HttpStatus.NOT_FOUND);
            
            const newReserva = this.reservaRepository.create(reservaBody)
            return this.reservaRepository.save(newReserva)
        } catch (error) {
            throw new HttpException({
                error
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
        
    // funcion de listar reservacion
    getReservas(){
        try {
            return this.reservaRepository.find()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Error en la api',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}


