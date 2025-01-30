import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApplyService } from './apply.service';

@Controller('apply')
export class ApplyController {
    constructor(
        private readonly applyService: ApplyService,
    ) {}

    @Post('/event')
    async apply(@Body() body: any): Promise<string> {
        const userId = body.userId;
        return this.applyService.applyEvent(userId);
    }

    @Delete('/reset')
    async reset(): Promise<void> {
        return this.applyService.resetApplies();
    }
}