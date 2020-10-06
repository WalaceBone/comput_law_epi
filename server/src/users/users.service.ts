import { Injectable, ConflictException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {User, UserForm} from './interface/users.interface';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

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

    async editUser(user: any, userData: UserForm) {
        const hash = userData.password ? await bcrypt.hash(userData.password, 10) : user.password;

        if (userData.username) {
            const findUser = await this._model.findOne({ username: userData.username });
            if (findUser) {
                throw new ConflictException("Username already taken");
            }
        }
        return this._model.findByIdAndUpdate(user.id, {
            username: userData.username ? userData.username : user.username,
            password: hash ? hash : user.password
        }, {
            new: true
        }).then(newUser => {
            return newUser;
        });
    }
}
