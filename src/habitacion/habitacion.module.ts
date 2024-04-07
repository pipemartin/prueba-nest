import { Module } from '@nestjs/common';
import { HabitacionController } from './habitacion.controller';
import { HabitacionService } from './habitacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from './habitacion.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Habitacion])],
  controllers: [HabitacionController],
  providers: [HabitacionService],
  exports: [HabitacionService]
})
export class HabitacionModule {}
