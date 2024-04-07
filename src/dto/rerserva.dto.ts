
import { IsNotEmpty, IsNumber} from "class-validator" 
export class CreateReservaDto {
    @IsNotEmpty()
    horaInicio: string
    @IsNotEmpty()
    horaFin: string
    @IsNumber()
    @IsNotEmpty()
    roomId: number
}