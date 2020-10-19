import {ApiProperty} from "@nestjs/swagger";

export default class EligibleTerritoryDto {

    @ApiProperty({
        description: "The list of eligible territory for british nationality"
    })
    terriotry: [string];
}
