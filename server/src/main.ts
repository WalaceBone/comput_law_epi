import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {IoAdapter} from "@nestjs/platform-socket.io";
import {join} from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({origin: ['http://localhost:8080', 'http://localhost:8081', 'https://postwoman.io'], credentials: true});

  const options = new DocumentBuilder()
      .setTitle("Comput Law")
      .setDescription("Comput Law API doc")
      .setVersion("0.1")
      .addBearerAuth()
      .build()

  app.useStaticAssets(join(__dirname, '../assets/uploads'), {
    index: false,
    redirect: false
  });

  app.useStaticAssets(join(__dirname, '../assets/games'), {
    index: false,
    redirect: false
  });

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000);
}
bootstrap();
