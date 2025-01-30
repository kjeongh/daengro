import { KafkaService } from '@daengro/kafka';
import { KAFKA_CLIENT } from '@daengro/kafka/constants/kafka-client';
import { TOPIC } from '@daengro/kafka/constants/topic.constants';
import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import type { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class IssueService implements OnModuleInit{

  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafka: KafkaService,
  ) {}

  // kafka consumer 초기화
  onModuleInit() {
    this.kafka.initConsumer({
      groupId: 'issue-rewar',
      topics: [TOPIC.APPLY_EVENT],
      eachMessage: async({ message }) => {
        this.handleApplyEvent(message);
      }
    });
  }

  handleApplyEvent(message: KafkaMessage) {
    console.log('MESSAGE RECEIVED: ', message);
  }
}
