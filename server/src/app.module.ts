import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";

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
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
