import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { PrismaService } from './services/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //valida a partir das classes DTOS
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
