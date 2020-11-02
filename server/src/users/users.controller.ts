import { Controller, Get, UseGuards, Req, NotFoundException, Delete, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse, ApiOkResponse, ApiConflictResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import ErrorDto from 'src/dto/error.dto';
import UserDto from 'src/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { MessageResponseDto } from 'src/dto/messageReponse.dto';
import { UserForm, rulesForm } from './interface/users.interface';
import RulesDto from 'src/dto/rules.dto';
import { request } from 'http';

@ApiTags('user')
@Controller('user')
export class UsersController {

    constructor(private readonly userService: UsersService) {}


    @Get('/me')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ type: ErrorDto })
    @ApiOkResponse({ type: UserDto })
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Req() request) {
        const user = await this.userService.model.findById(request.user.id).select("-password")
            .then(result => {
                return result;
            }).catch(() => {
                throw new NotFoundException("Cannot find user");
            });
        return user;
    }

    @Get('/activatedRules')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ type: ErrorDto })
    @ApiOkResponse({ type: RulesDto })
    @UseGuards(AuthGuard('jwt'))
    async getAcvtivatedRules(@Req() request) {
        const user = await this.userService.model.findById(request.user.id).select("-password")
            .then(result => {
                return result;
            }).catch(() => {
                throw new NotFoundException("Cannot find user");
            });
        return user.rules;
    }

    @Patch('/modifiedRules')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ type: ErrorDto })
    @ApiOkResponse({ type: RulesDto })
    @UseGuards(AuthGuard('jwt'))
    async modifiedUserRules(@Req() request, @Body() rulesData: rulesForm) {
        return await this.userService.editRulesUser(request.user, rulesData);
    }

    @Patch('/me')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ type: ErrorDto })
    @ApiConflictResponse({ description: "When the user already exist", type: ErrorDto })
    @ApiOkResponse({ type: UserDto })
    @UseGuards(AuthGuard('jwt'))
    async patchProfile(@Req() request, @Body() userData: UserForm) {
        return await this.userService.editUser(request.user, userData);
    }

    @Delete('/me')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ type: ErrorDto })
    @ApiOkResponse({ type: MessageResponseDto })
    @UseGuards(AuthGuard('jwt'))
    async deleteProfile(@Req() request) {
        await this.userService.model.findByIdAndDelete(request.user.id)
            .then(result => {
                return result;
            }).catch(() => {
                throw new NotFoundException("Cannot find user");
            });
        return { message: "Account Deleted" };
    }
}
