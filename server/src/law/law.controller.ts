import { Controller, Post, UseGuards, Req, Body, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LawService } from './law.service';
import ErrorDto from 'src/dto/error.dto';
import { MessageResponseDto } from 'src/dto/messageReponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { lawForm } from './interface/law.interface';
import EligibleTerritoryDto from 'src/dto/eligibleTerriory.dto';
import { EligibleTerritory } from 'src/globals/eligibleTerrioty.enum';

@ApiTags('law')
@Controller('law')
export class LawController {

    constructor(private readonly lawService: LawService) {}

    @Get('/eligibleTerrotory')
    @ApiOkResponse({ type: EligibleTerritoryDto })
    async getEligibleTerritory() {
        return {
            territory: Object.keys(EligibleTerritory).map(key => EligibleTerritory[key as any])
        }
    }

    @Post('/britishCitizenTest')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ type: ErrorDto })
    @ApiOkResponse({ type: MessageResponseDto })
    @UseGuards(AuthGuard('jwt'))
    async isABritishCitizen(@Req() request, @Body() data: lawForm) {
        if (data.bornBritishTerritory === false) {
            return {message: "You can't have the british nationality if you are not born in uk or eligible territory."};
        }
        if (data.isParentBritishNationality === true || data.isParentLiveBritishTerritory === true) {
            return {message: "Congrats you can have the british nationality"};
        }
        if (data.isParentMemberArmedForces === true) {
            return {message: "Congrats you can have the british nationality"};
        }
        return {message: "You can't have the british nationality if you are not born in uk or eligible territory."};
    }
}
