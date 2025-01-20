import { NestFactory } from '@nestjs/core';
import { ApplyModule } from './apply.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplyModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
