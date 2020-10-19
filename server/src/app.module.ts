import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { LawModule } from './law/law.module';

export function getMongoUrl(): string {
  let mongodbUrl = "mongodb://";

  if (process.env.DB_USER) {
    mongodbUrl += process.env.DB_USER;
  }

  if (process.env.DB_PASS) {
    mongodbUrl += ':' + process.env.DB_PASS;
  }

  if (process.env.DB_USER) {
    mongodbUrl += '@';
  }

  mongodbUrl += process.env.DB_HOST;

  if (process.env.DB_PORT) {
    mongodbUrl += ':' + process.env.DB_PORT;
  }

  mongodbUrl += '/' + process.env.DB_NAME;
  return mongodbUrl;
}

@Module({
  imports: [
      MongooseModule.forRootAsync({
        useFactory: () => ({
          uri: getMongoUrl()
        })
      }),
      AuthModule,
      UsersModule,
      LawModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
