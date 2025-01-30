import type { ConfigService } from "@nestjs/config";
import type { KafkaConfig } from "kafkajs";
import { Kafka, logLevel } from "kafkajs";

/**
 * 카프카 클라이언트 인스턴스
 */
export const connectKafkaClient = (configService: ConfigService): Kafka => {
    const clientId = configService.get<string>('KAFKA_CLIENT_ID');
    const brokers = configService.get<string>('KAFKA_BROKERS').split(',');

    const kafkaConfig: KafkaConfig = {
        clientId,
        brokers,
        logLevel: logLevel.INFO,
    };

    console.log(kafkaConfig)

    return new Kafka(kafkaConfig);
}