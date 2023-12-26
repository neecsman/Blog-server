import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 4000;

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('/api');
  await app.listen(PORT);
  console.log(`Application is running on: ${PORT}`);
}
bootstrap();
