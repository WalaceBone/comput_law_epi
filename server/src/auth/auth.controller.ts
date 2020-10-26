import {BadRequestException, UnauthorizedException, Body, ConflictException, Controller, Post, HttpCode, Get, Query} from '@nestjs/common';
import {ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse, ApiOkResponse, ApiQuery} from "@nestjs/swagger";
import {UsersService} from "../users/users.service";
import ErrorDto from "../dto/error.dto";
import {AuthUser, User} from "../users/interface/users.interface";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import TokenDto from '../dto/token.dto';

export interface JwtPayload {
    id: string,
    type: string
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    @Post('/register')
    @ApiConflictResponse({ description: "When the user already exists.", type: ErrorDto })
    @ApiBadRequestResponse({ description: "Malformed request.", type: ErrorDto })
    @ApiCreatedResponse({ description: "User created.", type: User })
    async register(@Body() user: AuthUser) {
        if (!user.username || !user.password) {
            throw new BadRequestException("Missing parameter.");
        }

        const test = await this.usersService.model.findOne({ username: user.username });
        if (test) {
            throw new ConflictException("User already exists.");
        }

        return bcrypt.hash(user.password, 10)
            .then(hash => {
                return this.usersService.model.create({
                    username: user.username,
                    password: hash,
                    rules: ['1', '1A', '2', '3', '3A', '4', '5', '5A', '6', '7', '8', '9'],
                    isBirtish: undefined
                }).then(user => {
                    return user;
                });
            });
    }

    @Post('/login')
    @ApiUnauthorizedResponse({ description: "When authentication fails.", type: ErrorDto})
    @ApiBadRequestResponse({description: "Malformed request", type: ErrorDto})
    @ApiOkResponse({description: "User logged in."})
    @HttpCode(200)
    async login(@Body() user: AuthUser) {
        if (!user.username || !user.password) {
            throw new BadRequestException("Missing parameter");
        }

        const dbUser = await this.usersService.model.findOne({username: user.username});
        if (!dbUser) {
            throw new UnauthorizedException("User does not exist");
        }
        return bcrypt.compare(user.password, dbUser.password)
            .then(res => {
                if (!res) {
                    throw new UnauthorizedException("Invalid credentials");
                }
                return {
                    accessToken: this.jwtService.sign({id: dbUser.id, type: 'access'}, {expiresIn: '60m'}),
                    refreshToken: this.jwtService.sign({id: dbUser.id, type: 'refresh'}, {expiresIn: '180d'})
                };
            });
    }

    @Get('/refreshToken')
    @ApiBadRequestResponse({ description: "If the token is invalid", type:ErrorDto})
    @ApiOkResponse({ type: TokenDto })
    @ApiQuery({ name: 'token', type: 'string' })
    async refreshToken(@Query('token') token) {
        try {
            this.jwtService.verify(token)
        } catch(error) {
            throw new BadRequestException("Invalid token")
        }

        const payload = this.jwtService.decode(token) as JwtPayload;

        if (payload.type !== 'refresh') {
            throw new BadRequestException("Invalid token")
        }

        return {
            accessToken: this.jwtService.sign({id: payload.id, type: 'access'}, {expiresIn: '60m'}),
            refreshToken: this.jwtService.sign({id: payload.id, type: 'refresh'}, {expiresIn: '180d'})
        }
    }
}
