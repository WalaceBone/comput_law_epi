import {ApiProperty} from "@nestjs/swagger";

export default class ErrorDto {

    @ApiProperty({
        description: "The error status code."
    })
    statusCode: number;

    @ApiProperty({
        description: "The error description message."
    })
    message: string;

    @ApiProperty({
        description: "The error type."
    })
    error: string;
}