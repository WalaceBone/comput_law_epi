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
import RulesDto from 'src/dto/rules.dto';
import { Rules } from 'src/globals/rules.enum';

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

    @Get('/availableRules')
    @ApiOkResponse({ type: RulesDto })
    async getAvailableRules() {
        return {
            rules: Object.keys(Rules).map(key => Rules[key as any])
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
        const isOverseasTerritory = await this.lawService.isOverseasTerritories(data.bornPlace);
        if (user.rules.length === 0) {
            return {message: answerMessageTest.OK};
        }
        if (this.lawService.isRulesActivated(user.rules, "1") && data.isAdopt === false) {
            if (data.isParentBritishNationality === true || data.isParentLiveBritishTerritory === true) {
                return {message: answerMessageTest.OK + "1"};
            }
        }
        if (this.lawService.isRulesActivated(user.rules, "1A") && data.isAdopt === false) {
            if (data.isParentMemberArmedForces === true && await this.lawService.isBornAfter(data.birthDate, "2009") === true) {
                return {message: answerMessageTest.OK + "1A"};
            }
        }
        if (this.lawService.isRulesActivated(user.rules, "2") && data.isAdopt === false) {
            if (data.isParentLiveBritishTerritory === true && await this.lawService.isBornAfter(data.birthDate, "2009") === true) {
                return {message: answerMessageTest.OK + "2"};
            } else if (data.isParentBritishNationality === true && await this.lawService.isBornAfter(data.birthDate, "2009") === true) {
                return {message: answerMessageTest.OK + "2"};
            }
        }
        if (this.lawService.isRulesActivated(user.rules, "3") && data.isAdopt === false) {
            if (await this.lawService.isMajor(data.birthDate) === false && data.isParentBritishNationality === false 
            && data.isParentLiveBritishTerritory === false && await this.lawService.isOverseasTerritories(data.bornPlace) === false) {
                return {message: "You can obtain British nationality if, while you are a minor, one of your parents becomes British citizens or settles in the United Kingdom"};
            } else if (await this.lawService.isMajor(data.birthDate) === false && data.isParentBritishNationality === false 
            && data.isParentLiveBritishTerritory === false && await this.lawService.isOverseasTerritories(data.bornPlace) === true) {
                return {message: "You can obtain British nationality if, while you are minor, one of your parents becomes citizens or settles in a overseas territories"};
            }
        }
        if (this.lawService.isRulesActivated(user.rules, "3A") && data.isAdopt === false) {
            if (await this.lawService.isMajor(data.birthDate) === false && data.isParentMemberArmedForces === false) {
                return {message: "You can obtain British nationality if, while you are a minor, one of your parents becomes a member of the armed forces"};
            }
        }
        if (this.lawService.isRulesActivated(user.rules, "4") && data.isAdopt === false) {
            if (data.isAbsentBritishTerritory === false) {
                return {message: answerMessageTest.OK + "4"};
            }
        }
        if (this.lawService.isRulesActivated(user.rules, "5") && data.isAdopt === true) {
            if (this.lawService.isRulesActivated(user.rules, "5A")) {
                if (data.isParentBritishNationality === true || data.isParentLiveBritishTerritory === true) {
                    return {message: answerMessageTest.OK + "5A"};
                }
            }
        }
        return {message: answerMessageTest.KO};
    }
}
