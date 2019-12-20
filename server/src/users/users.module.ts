import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{
            name: 'User',
            schema: UserSchema,
        }])
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ], 
    controllers: [
        UsersController
    ]
})
export class UsersModule {}
