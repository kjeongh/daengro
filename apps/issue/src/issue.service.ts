import { KafkaService } from '@daengro/kafka';
import { KAFKA_CLIENT } from '@daengro/kafka/constants/kafka-client';
import { TOPIC } from '@daengro/kafka/constants/topic.constants';
import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import type { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class IssueService implements OnModuleInit{

  constructor(
    private readonly kafka: KafkaService,
  ) {}

  // kafka consumer 초기화
  async onModuleInit() {
    await this.kafka.initConsumer({
      groupId: 'issue-reward',
      topics: [TOPIC.APPLY_EVENT],
      eachMessage: async({ message }) => {
        this.handleApplyEvent(message);
      }
    })
    .catch((error) => {
      console.error('Failed to initialize Kafka consumer: ', error);
    });
  }

  handleApplyEvent(message: KafkaMessage) {
    console.log('MESSAGE RECEIVED: ', message);
  }
}
