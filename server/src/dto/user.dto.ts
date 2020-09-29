import {ApiProperty} from '@nestjs/swagger';

export default class UserDto {
    
    @ApiProperty({
        description: "ID of the user."
    })
    id: string;

    @ApiProperty({
        description: "Username of the user."
    })
    username: string;

    @ApiProperty({
        description: "rules activated for user."
    })
    rules: string[];

    @ApiProperty({
        description: "true if the user can have the nationality british false otherwise."
    })
    isBritish: boolean;
}