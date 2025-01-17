import type { ConfigService } from "@nestjs/config";
import type { Kafka } from "kafkajs";


export const connectKafkaClient = (configService: ConfigService): Kafka => {
    const kafkaConfigOptions = configService.get<KafkaCU
}