import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    async register(
        email: string,
        name: string,
        password: string 
    ) {
        const foundEmail = await this.userModel.findOne({ email });

        if(foundEmail) {
            throw new BadRequestException('Email address is already in use.');
        }

        const salt = await bcrypt.genSalt(10);
        const genPassword = await bcrypt.hash(password, salt);

        const user = new this.userModel({
            email,
            name,
            password: genPassword
        });

        user.save();
    }
}
