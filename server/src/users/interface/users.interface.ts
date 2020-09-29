import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export class User extends Document {

    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    rules: string[];

    @ApiProperty()
    isBritish: boolean;
}

export class AuthUser {

    @ApiProperty({
       description: 'The username for authentication'
    })
    username: string;

    @ApiProperty({
        description: 'The password for authentication'
    })
    password: string;
}

export class UserForm {

    @ApiProperty({
        description: 'The profile username'
    })
    username: string;

    @ApiProperty({
        description: 'The profile password'
    })
    password: string;
}