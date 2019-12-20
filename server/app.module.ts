import { Module } from '@nestjs/common';
import { AngularUniversalModule, applyDomino } from '@nestjs/ng-universal';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './src/users/users.module';

const BROWSER_DIR = join(process.cwd(), 'dist/browser');

@Module({
    imports: [
        AngularUniversalModule.forRoot({
            viewsPath: BROWSER_DIR,
            bundle: require('../server/main'),
            liveReload: true
        }),
        MongooseModule.forRoot('mongodb+srv://<username:password>@cluster0-4boro.mongodb.net/test?retryWrites=true&w=majority'),
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class ApplicationModule {}
