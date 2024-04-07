import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReservaDto } from 'src/dto/rerserva.dto';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {
    constructor(
        private reservaService: ReservaService
    ){

    }

    @Post()
    createReserva(@Body() postBody: CreateReservaDto){
        return this.reservaService.createReserva(postBody)
    }

    @Get()
    getReservas(){
        return this.reservaService.getReservas()
    }
}
