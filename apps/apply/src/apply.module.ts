import { KafkaModule, KafkaService } from '@daengro/kafka';
import { Module } from '@nestjs/common';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';
import { RedisModule, RedisService } from '@daengro/redis';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        KafkaModule.forRoot(),
        RedisModule.forRoot(),
        ThrottlerModule.forRoot([{
            ttl: 3000,
            limit: 5,
        }])
    ],
    providers: [ApplyService, KafkaService, RedisService, {
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
    }],
    controllers: [ApplyController]
})
export class ApplyModule {}
