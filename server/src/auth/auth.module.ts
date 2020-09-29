import {Module} from '@nestjs/common';
import {UsersModule} from "../users/users.module";
import {AuthController} from "./auth.controller";
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from '../passport/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({secret: 'secret'})
    ],
    providers: [
        JwtStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule {}
