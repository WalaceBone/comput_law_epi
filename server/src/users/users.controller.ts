import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

}
