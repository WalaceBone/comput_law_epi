import { ApiProperty } from "@nestjs/swagger";

export class lawForm {

    @ApiProperty({
        description: "True if is born in uk or a eligible territory false otherwise"
    })
    bornBritishTerritory: boolean;

    @ApiProperty({
        description: "True if on of two parent have the british nationality false otherwise"
    })
    isParentBritishNationality: boolean;

    @ApiProperty({
        description: "True if on of two parent live in uk or eligible territory false otherwise"
    })
    isParentLiveBritishTerritory: boolean;

    @ApiProperty({
        description: "True if on of two parent are member of the armed forces during born"
    })
    isParentMemberArmedForces: boolean;

    @ApiProperty({
        description: "The territory where is born"
    })
    bornPlace: string;

    @ApiProperty({
        description: "Date of born"
    })
    birthDate: string;
}