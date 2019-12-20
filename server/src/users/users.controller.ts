import { Controller, UseGuards, Post, Request, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from '../_dtos/UserDto';
import { InjectModel } from '@nestjs/mongoose';

@Controller('auth')
export class UsersController {
    
    constructor (
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        @InjectModel('User') private readonly userModel
    ) { }
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    hello() {
        return {
            test: 'this'
        }
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        // return await this.userModel.findOne({ email: 'eric.miller2129@gmail.com' });
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() user: CreateUserDto) {
        await this.usersService.register(
            user.email,
            user.name,
            user.password
        );
    }
}
