import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { HabitacionService } from 'src/habitacion/habitacion.service';
import { Reserva } from './reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionModule } from 'src/habitacion/habitacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva]), HabitacionModule],
  controllers: [ReservaController],
  providers: [ReservaService]
})
export class ReservaModule {}
