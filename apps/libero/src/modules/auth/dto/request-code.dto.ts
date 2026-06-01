import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class requestCodeDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'juan@gmail.com' })
    email: string;

}
