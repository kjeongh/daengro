import { KafkaService } from '@daengro/kafka';
import { KAFKA_CLIENT } from '@daengro/kafka/constants/kafka-client';
import { TOPIC } from '@daengro/kafka/constants/topic.constants';
import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import type { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import * as path from 'path';
import * as fs from 'fs';

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

  async handleApplyEvent(message: KafkaMessage) {
    // 임시 파일에 이벤트 당첨자 저장
    const receiveFilePath = path.join(process.cwd(), 'temp/receive_history.txt');
    const receiverId = message.value.toString().replace(/"/g, '');

    console.log('이벤트 당첨자: ', receiverId);
    console.log(`유저 ${receiverId} 의 쿠폰 발급 시간: ${Date.now()}`);

    await fs.promises.appendFile(receiveFilePath, receiverId + '\n');
  }
}
