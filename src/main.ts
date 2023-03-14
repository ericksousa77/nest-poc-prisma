import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import configuration from './config/configuration';
import { AppModule } from './modules/app.module';
import { PrismaService } from './services/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port } = configuration();

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);

  await app.listen(port);
}
bootstrap();
