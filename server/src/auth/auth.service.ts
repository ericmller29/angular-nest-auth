import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email });

        if(!user) return null;

        const validPassword = await bcrypt.compare(password, user.password);

        if(validPassword) {
            const { password, ...result } = user;
            
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        const { email, _id, name} = user['_doc'];

        return {
            user: {
                _id,
                email,
                name
            },
            access_token: this.jwtService.sign(payload),
        };
    }
}
