import { ValidationPipe } from '@nestjs/common';
import { AppConfig } from './app.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function makeOrmConfig() {
  const appConfig = new AppConfig(process.env);
  const typeOrmConfig = appConfig.getTypeOrmConfig();
  const ormConfig = JSON.stringify(typeOrmConfig, null, 2);
  fs.writeFileSync('ormconfig.json', ormConfig);
}

async function bootstrap() {
  await makeOrmConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
