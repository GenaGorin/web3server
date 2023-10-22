import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'test@mail.ru', description: 'user email' })
    @IsString({ message: 'Should be string' })
    @IsEmail({}, { message: 'Should be Email' })
    readonly email: string;

    @ApiProperty({ example: '1234', description: 'user password' })
    @IsString({ message: 'Should be string' })
    @Length(4, 16, { message: 'Password length should be between 4 and 16' })
    readonly password: string;
}