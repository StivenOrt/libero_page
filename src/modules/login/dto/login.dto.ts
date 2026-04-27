import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'admin@libero.com' })
  identifier: string;

  @IsString()
  @ApiProperty({ example: 'password123' })
  password: string;
}