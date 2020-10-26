import { Controller, Post, UseGuards, Req, Body, Get, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LawService } from './law.service';
import ErrorDto from 'src/dto/error.dto';
import { MessageResponseDto } from 'src/dto/messageReponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { lawForm } from './interface/law.interface';
import EligibleTerritoryDto from 'src/dto/eligibleTerriory.dto';
import { EligibleTerritory } from 'src/globals/eligibleTerrioty.enum';
import { answerMessageTest } from 'src/globals/answerMessageTest.enum';
import { UsersService } from 'src/users/users.service';
import * as MOCKED_RESPONSE_TS from '../rules/britishNationalityLawRules.json';

@ApiTags('law')
@Controller('law')
export class LawController {

    constructor(private readonly lawService: LawService, private readonly userService: UsersService) {}

    @Get('/eligibleTerritory')
    @ApiOkResponse({ type: EligibleTerritoryDto })
    async getEligibleTerritory() {
        return {
            territory: Object.keys(EligibleTerritory).map(key => EligibleTerritory[key as any])
        }
    }

    @Get('/BritishNationalityAct')
    async getBritishNationalityAct() {
        return MOCKED_RESPONSE_TS;
    }

    @Post('/britishCitizenTest')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ type: ErrorDto })
    @ApiOkResponse({ type: MessageResponseDto })
    @UseGuards(AuthGuard('jwt'))
    async isABritishCitizen(@Req() request, @Body() data: lawForm) {
        const user = await this.userService.model.findOne({username: request.user.username})
            .then(result => {
                return result;
            }).catch(() => {
                throw new NotFoundException("Cannot find username with name " + request.user.username);
            });
        const isOverseasTerritory = await this.lawService.isOverseasTerritories(data.bornPlace.toLowerCase());
        console.log(isOverseasTerritory);
        if (user.rules.length === 0) {
            return {message: answerMessageTest.OK};
        }
        if (isOverseasTerritory) {
            console.log("yes");
        } else if (!isOverseasTerritory) {
            console.log("no");
            if (this.lawService.isRulesActivated(user.rules, "1")) {
                if (data.isParentBritishNationality || data.isParentLiveBritishTerritory) {
                    return {message: answerMessageTest.OK};
                }
            }
            if (this.lawService.isRulesActivated(user.rules, "1A")) {
                if (data.isParentMemberArmedForces === true && await this.lawService.isBornAfter(data.birthDate, "2009") === true) {
                    return {message: answerMessageTest.OK};
                }
            }
        }
        return {message: answerMessageTest.KO};
    }
}
