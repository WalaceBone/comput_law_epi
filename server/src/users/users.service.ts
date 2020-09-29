import { Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {User} from './interface/users.interface';
import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
    id: string
}

@Injectable()
export class UsersService {

    get model() {
        return this._model;
    }

    constructor(@InjectModel('User') private _model: Model<User>) {}

    async validateUser(payload: any) {
        return this._model.findById(payload.id);
    }

    async extractPayloadFromCookie(cookie) {
        const cookies: string[] = cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('accessToken')).split('=')[1];
        return jwt.verify(authToken, 'secret') as JwtPayload;
    }
}
