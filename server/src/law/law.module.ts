import { Module } from '@nestjs/common';
import { LawController } from './law.controller';
import { LawService } from './law.service';
import { UsersService } from 'src/users/users.service';
import { UserSchema } from 'src/users/schema/users.schema';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature(
        [
          {
            name: 'User',
            schema: UserSchema
          }
        ]
    )
  ],
  controllers: [LawController],
  exports: [LawService],
  providers: [UsersService, LawService]
})
export class LawModule {}
