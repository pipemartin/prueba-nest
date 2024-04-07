import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Habitacion } from 'src/habitacion/habitacion.entity';
import { Cliente } from 'src/cliente/cliente.entity';

@Entity({name: 'reserva'})
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'time' })
    horaInicio: string;

    @Column({ type: 'time' })
    horaFin: string;

    @Column()
    roomId: number

    @Column()
    clientId: number

    @ManyToOne(()=>Habitacion,habitacion=> habitacion.habitacion)
    room: Habitacion

    @ManyToOne(()=>Cliente, cliente=> cliente.cliente)
    client: Cliente

}