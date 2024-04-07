import { Controller,  Post, Body, Get } from '@nestjs/common';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from 'src/dto/cliente.dto';

@Controller('cliente')
export class ClienteController {

    constructor(private clienteService: ClienteService){}
    // post de crear cliente
    @Post()
    createCliente(@Body() newCliente: CreateClienteDto): Promise<Cliente>{
        return this.clienteService.createCliente(newCliente)
    }
    // get de listar clientes
    @Get()
    getClientes(): Promise<Cliente[]>{
        return this.clienteService.getCliente()
    }

}
