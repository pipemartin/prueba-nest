import { IsNotEmpty, IsNumber, IsAlpha, IsEmail} from "class-validator" 
export class CreateClienteDto {
    @IsAlpha()
    @IsNotEmpty()
    nombre: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    telefono: number;
}