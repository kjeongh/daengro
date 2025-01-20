import { KafkaModule, KafkaService } from '@daengro/kafka';
import { Module } from '@nestjs/common';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';

@Module({
    imports: [
        KafkaModule.forRoot(),
    ],
    providers: [ApplyService, KafkaService],
    controllers: [ApplyController]
})
export class ApplyModule {}
