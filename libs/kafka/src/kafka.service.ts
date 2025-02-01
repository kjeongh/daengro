import { Inject, Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { KAFKA_CLIENT } from './constants/kafka-client';
import type { EachMessageHandler, Kafka, Producer, ProducerRecord } from 'kafkajs';
import type { Topic } from './constants/topic.constants';


@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private producer: Producer;

    constructor(
        @Inject(KAFKA_CLIENT) private readonly kafkaClient: Kafka
    ) {}

    async onModuleInit() {
        if (!this.producer) {
            await this.initProducer();
        }
    }

    async onModuleDestroy() {
        throw new Error('Method not implemented.');
    }

    private async initProducer() {
        // if (this.producer) return;

        this.producer = this.kafkaClient.producer();
        await this.producer.connect();
    }

    private async disConnectProducer() {
        if (!this.producer) return;

        await this.producer.disconnect();
    }

    public async send({
        topic,
        messages,
    }: ProducerRecord) {
        await this.initProducer();

        try {
            await this.producer.send({
                topic,
                messages
            });
        } catch (error) {
            console.log(`Failed to send message to Kafka: ${messages[0].value}`, error);
        }
    }

    public async initConsumer({
        groupId,
        topics,
        eachMessage,
    }: {
        groupId: string;
        topics: Topic[];
        eachMessage: EachMessageHandler;
    }) {
        const consumer = this.kafkaClient.consumer({
            groupId,
            retry: {
                maxRetryTime: 10000,
                retries: 5,
                initialRetryTime: 100,
            }
        })

        await consumer.connect();

        await consumer.subscribe({
            topics,
        })
        
        await consumer.run({
            eachMessage,
        });
    }

    // disconnect consumer

    // disconnect all consumers
}
