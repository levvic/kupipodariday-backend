import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationException } from './exceptions/validation-exception';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, { cors: true });


  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();