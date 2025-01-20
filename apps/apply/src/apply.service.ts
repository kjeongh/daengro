import type { KafkaService } from "@daengro/kafka";
import { KAFKA_CLIENT } from "@daengro/kafka/constants/kafka-client";
import { TOPIC } from "@daengro/kafka/constants/topic.constants";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ApplyService {
    constructor(
        @Inject(KAFKA_CLIENT) private readonly kafka: KafkaService,
    ) {}

    async applyEvent() {
        const userId = 'test_user_id';

        this.kafka.send({
            topic: TOPIC.APPLY_EVENT,
            messages: [
                {
                    value: JSON.stringify(userId),
                }
            ]
        })
    }
}