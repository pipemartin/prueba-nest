import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Habitacion } from './habitacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHabitacion, UpdateHabitacionDto } from 'src/dto/habitacion.dto';
@Injectable()
export class HabitacionService {
    constructor(
        @InjectRepository(Habitacion) private habitacionRepository: Repository<Habitacion>
    ){}

    // funcion de crear habitacion
    async createHabitacion(habitacion: CreateHabitacion){
        try {
            const newHabitacion = this.habitacionRepository.create(habitacion)
            return this.habitacionRepository.save(newHabitacion)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Error en la api',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    // funcion de listar habitaciones
    getHabitaciones(){
        try {
            return this.habitacionRepository.find()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Error en la api',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    // funcion de listar por id a las habitaciones
    async getHabitacion(id: number){
        try {
            const habitacionFound = await this.habitacionRepository.findOne({
                where: {
                    id
                }
            })
            if(!habitacionFound) throw new HttpException("Room not found", HttpStatus.NOT_FOUND);
            return habitacionFound;
        } catch (error) {
            throw new HttpException({
                error
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    // funcion de listar por disponibilidad a las habitaciones. ademas, se pagina por listado de 2 
    async getHabitacionDisponible(page: number = 1, perPage: number = 2){
        try {
            const estado: string = 'Disponible';
            const skip = (page - 1) * perPage;
            const [habitacionFound, total] = await this.habitacionRepository.findAndCount({
                where: {
                    estado
                },
                take: perPage,
                skip: skip
            })
            const totalPages = Math.ceil(total / perPage);
            if(!habitacionFound) throw new HttpException("Todas las Habitaciones estan ocupadas", HttpStatus.NOT_FOUND);
            return {
                total: total,
                totalPages: totalPages,
                currentPage: page,
                perPage: perPage,
                data: habitacionFound
            };;
        } catch (error) {
            throw new HttpException({
                error
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    // funcion de eliminar habitacion por id posdata: cambiar el parametro mediante body y no de URL 
    async deleteHabitacion(id: number){
        try {
            const result = await this.habitacionRepository.delete(id)
            if(result.affected ===0) throw new HttpException("Room not found", HttpStatus.NOT_FOUND);
            return new HttpException("Room deleted", HttpStatus.OK);
        } catch (error) {
            throw new HttpException({
                error
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    // funcion de actualizar habitacion por id posdata: cambiar el parametro mediante body y no de URL 
    async updateHabitacion(id: number, habitacion: UpdateHabitacionDto){
        try {
            const habitacionFound = await this.habitacionRepository.findOne({
                where: {
                    id
                }
            })
            if(!habitacionFound) {throw new HttpException("Room not found", HttpStatus.NOT_FOUND);}
            const updateHabitacion = Object.assign(habitacionFound, habitacion)
            return this.habitacionRepository.save(updateHabitacion)
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
