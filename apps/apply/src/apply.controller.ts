import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { Throttle } from '@nestjs/throttler';

@Controller('apply')
export class ApplyController {
    constructor(
        private readonly applyService: ApplyService,
    ) {}

    @Post('/event')
    @Throttle({
        default: {
            limit: 3,
            ttl: 30000,
        }
    })
    async apply(@Body() body: any): Promise<string> {
        const userId = body.userId;
        return this.applyService.applyEvent(userId);
    }

    @Delete('/reset')
    async reset(): Promise<void> {
        return this.applyService.resetApplies();
    }
}