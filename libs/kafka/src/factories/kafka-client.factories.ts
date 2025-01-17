import type { ConfigService } from "@nestjs/config";
import type { KafkaConfig } from "kafkajs";
import { KafkaOptions } from "../interfaces/kafka.config.interface";
import { Kafka } from "kafkajs";

/**
 * 카프카 클라이언트 인스턴스
 */
export const connectKafkaClient = (configService: ConfigService): Kafka => {
    const kafkaOptions = configService.get<KafkaOptions>('KAFKA');

    const { clientId, brokers } = kafkaOptions;

    const kafkaConfig: KafkaConfig = {
        clientId,
        brokers,
    };

    return new Kafka(kafkaConfig);
}