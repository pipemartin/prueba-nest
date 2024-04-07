import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "src/reserva/reserva.entity";

@Entity('habitacion')
export class Habitacion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    numberBed: number

    @Column()
    tipo: string
    @Column()
    descripcion: string
    @Column()
    estado: string

    @OneToMany(()=>Reserva, reserva=>reserva.room)
    habitacion: Reserva[]
}