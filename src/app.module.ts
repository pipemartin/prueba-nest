import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionModule } from './habitacion/habitacion.module';

import {config} from 'dotenv'
import { ReservaModule } from './reserva/reserva.module';
import { ClienteModule } from './cliente/cliente.module';
config();
const { MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DBNAME } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_HOST,
      port: parseInt(MYSQL_PORT),
      username: MYSQL_USER,
      password: '',
      database: MYSQL_DBNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // le archivos que se llamen .entity y carga la tabla
      synchronize: true, // se sincroniza
    }),
    HabitacionModule,
    ReservaModule,
    ClienteModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
