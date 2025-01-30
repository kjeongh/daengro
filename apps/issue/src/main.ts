import { NestFactory } from '@nestjs/core';
import { IssueModule } from './issue.module';

async function bootstrap() {
  const app = await NestFactory.create(IssueModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
