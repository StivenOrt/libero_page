import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginDto {

  @IsString()
  @ApiProperty({ example: 'admin@libero.com' })
  identifier: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'password123' })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '123456'})
  code?: string;

}