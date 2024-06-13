import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { swaggerUi } from './config/docs/swagger.config';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('port');

  const document = SwaggerModule.createDocument(app, swaggerUi);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true }));
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(cors());

  await app.listen(port, () => {
    console.warn(`Server running on port ${port}`);
  });
}
bootstrap();
