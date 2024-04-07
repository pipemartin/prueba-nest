import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, Put } from '@nestjs/common';
import { CreateHabitacion, UpdateHabitacionDto } from 'src/dto/habitacion.dto';
import { HabitacionService } from './habitacion.service';
import { Habitacion } from './habitacion.entity';

@Controller('habitacion')
export class HabitacionController {
    constructor(private habitacionService: HabitacionService){}

    @Post()
    createHabitacion(@Body() newHabitacion: CreateHabitacion): Promise<Habitacion>{
        return this.habitacionService.createHabitacion(newHabitacion)
    }
    @Get()
    getHabitaciones(): Promise<Habitacion[]>{
        return this.habitacionService.getHabitaciones()
    }

    @Get(':id')
    getHabitacion(@Param('id', ParseIntPipe) id: number):Promise<Habitacion>{
        return this.habitacionService.getHabitacion(id);
    }

    @Get('disponible/:page')
    getHabitacionDisponibles(@Param('page', ParseIntPipe) page: number){
        return this.habitacionService.getHabitacionDisponible(page);
    }

    @Delete(':id')
    deleteHabitacion(@Param('id', ParseIntPipe) id:number){
        return this.habitacionService.deleteHabitacion(id)
    }

    @Put(':id')
    updateHabitacion(@Param('id', ParseIntPipe) id:number, @Body() newHabitacion: UpdateHabitacionDto){
        return this.habitacionService.updateHabitacion(id,newHabitacion)
    }

}
