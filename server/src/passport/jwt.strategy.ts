import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret'
        });
    }

    async validate(payload: any) {
        if (payload.type !== 'access') {
            throw new UnauthorizedException()
        }
        return this.usersService.model.findById(payload.id);
    }
}