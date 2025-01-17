import { Module, type Provider } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@daengro/config';
import { KAFKA_CLIENT } from './constants/kafka-client';
import { ConfigService } from '@nestjs/config';
import { connectKafkaClient } from './factories/kafka-client.factories';

const KafkaClientProvider: Provider = {
    provide: KAFKA_CLIENT,
    useFactory: connectKafkaClient,
    inject: [ConfigService],
}

@Module({
  imports: [ConfigModule],
  providers: [
    KafkaClientProvider,
    KafkaService,
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
