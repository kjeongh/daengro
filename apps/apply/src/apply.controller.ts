import { Controller, Post } from '@nestjs/common';
import { ApplyService } from './apply.service';

@Controller('apply')
export class ApplyController {
    constructor(
        private readonly applyService: ApplyService,
    ) {}

    @Post('/event')
    async apply() {
        return this.applyService.applyEvent();
    }
}