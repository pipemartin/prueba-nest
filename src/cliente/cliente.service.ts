import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from 'src/dto/cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>
    ){}
    //funcion de crear cliente
    async createCliente(cliente: CreateClienteDto){
        const email = cliente.email
        const clienteFound = await this.clienteRepository.findOne({
            where: {
                email
            }
        })
        //validacion si encuentra un cliente mediante la comparacion de correo
        if(clienteFound) throw new HttpException("Client found", HttpStatus.NOT_FOUND);
        const newCliente = this.clienteRepository.create(cliente)
        return this.clienteRepository.save(newCliente)
    }
    //funcion de listar clientes
    getCliente() {
        return this.clienteRepository.find()
    }

}
