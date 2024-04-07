import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Reserva } from "src/reserva/reserva.entity";

@Entity('cliente')
export class Cliente{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    email: string

    @Column()
    telefono: number

    @OneToMany(()=>Reserva, reserva=>reserva.client)
    cliente: Reserva[]
}