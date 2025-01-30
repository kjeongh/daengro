import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { KafkaModule, KafkaService } from '@daengro/kafka';

@Module({
  imports: [
    KafkaModule.forRoot(),
  ],
  controllers: [IssueController],
  providers: [IssueService, KafkaService],
})
export class IssueModule {}
