import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(Users) private userReposistory: typeof Users) { }

    async findOrCreateUser(address: string) {
        let user = await this.userReposistory.findOne({ where: { address } });
        if (user) {
            return user;
        } else {
            let user = await this.userReposistory.create({ address, balance: 0 });
            return user;
        }
    }
}
