import {ApiProperty} from "@nestjs/swagger";

export default class TokenDto {

    @ApiProperty({
        description: "Acces token for user."
    })
    accessToken: string;

    @ApiProperty({
        description: "Refresh token for user."
    })
    refreshToken: string;
}