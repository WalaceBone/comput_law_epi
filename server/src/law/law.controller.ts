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
        if (user.rules.length === 0) {
            return {message: answerMessageTest.OK};
        }
        if (data.bornBritishTerritory === false) {
            return {message: answerMessageTest.KO + " if you are not born in uk or eligible territory."};
        }
        if (data.isParentBritishNationality === true || data.isParentLiveBritishTerritory === true) {
            return {message: answerMessageTest.OK};
        }
        if (data.isParentMemberArmedForces === true) {
            return {message: answerMessageTest.OK};
        }
        return {message: answerMessageTest.KO};
    }
}
