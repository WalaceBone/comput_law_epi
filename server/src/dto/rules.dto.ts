import { ApiProperty } from "@nestjs/swagger";

export default class RulesDto {

    @ApiProperty({
        description: "The list of all rules available"
    })
    rules: [string];
}