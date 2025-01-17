import { Controller, Get } from '@nestjs/common';
import { ApplyService } from './app.service';

@Controller()
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Get()
  getHello(): string {
    return this.applyService.create();
  }
}
