import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationException } from './exceptions/validation-exception';

async function bootstrap() {
  const PORT = process.env.SERVER_PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new ValidationException(),
    }),
  );

  app.use(helmet());

  await app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
}
bootstrap();