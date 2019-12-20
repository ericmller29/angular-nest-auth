import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/users.model';

@Module({
    imports: [
        PassportModule,
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            }
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '1 day'
            }
        })
    ],
    providers: [
        AuthService, 
        LocalStrategy, 
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
