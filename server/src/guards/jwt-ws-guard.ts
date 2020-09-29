import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";

@Injectable()
export class JwtWsGuard implements CanActivate {

    constructor(private usersService: UsersService) {}

    async canActivate(context: ExecutionContext) {
        const client = context.switchToWs().getClient();
        const jwtPayload = await this.usersService.extractPayloadFromCookie(client.handshake.headers.cookie);
        const user = await this.usersService.validateUser(jwtPayload);
        context.switchToWs().getData().user = user;
        return Boolean(user);
    }
}
