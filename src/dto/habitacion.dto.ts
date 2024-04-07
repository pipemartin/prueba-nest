import { IsAlpha, IsNotEmpty, MaxLength, MinLength, IsNumber } from "class-validator" 

export class CreateHabitacion {
    @IsNumber()
    @IsNotEmpty()
    numberBed: number;

    @IsAlpha()
    @IsNotEmpty()
    tipo: string;

    @MinLength(5,{ message: 'El campo debe contener al menos 5 caracter.' })
    @MaxLength(20)
    @IsNotEmpty()
    descripcion: string;
    
    @IsAlpha()
    @IsNotEmpty()
    estado: string;
}

export type UpdateHabitacionDto = Omit<CreateHabitacion,'numberBed' | 'tipo' | 'descripcion' | 'estado'>