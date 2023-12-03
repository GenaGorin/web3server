import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    createOrFindUser(@Body() dto: CreateUserDto) {
        return this.usersService.findOrCreateUser(dto.address);
    }
}
