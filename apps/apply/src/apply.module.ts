import { KafkaModule, KafkaService } from '@daengro/kafka';
import { Module } from '@nestjs/common';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';
import { RedisModule, RedisService } from '@daengro/redis';

@Module({
    imports: [
        KafkaModule.forRoot(),
        RedisModule.forRoot(),
    ],
    providers: [ApplyService, KafkaService, RedisService],
    controllers: [ApplyController]
})
export class ApplyModule {}
