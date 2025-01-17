import { Module } from '@nestjs/common';
import { ApplyController } from './app.controller';
import { ApplyService } from './app.service';
import { KafkaModule } from '@daengro/kafka';

@Module({
  imports: [
    KafkaModule.forRoot({
      
    }),
  ],
  controllers: [ApplyController],
  providers: [ApplyService],
})
export class ApplyModule {}
