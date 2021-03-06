import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from 'src/config/app.config';
import { AppModule } from './app.module';

export async function bootstrap(version: string) {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Insurance')
    .setDescription('Insurance profiles')
    .setVersion(version)
    .addTag('insurance')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.httpPort);
}
