import { NestFactory } from '@nestjs/core';
import { GrantModule } from './grant.module';

async function bootstrap() {
  const app = await NestFactory.create(GrantModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
