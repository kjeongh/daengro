import { Controller, Get } from '@nestjs/common';
import { ApplyService } from './apply.service';

@Controller()
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Get()
  getHello(): string {
    return this.applyService.getHello();
  }
}
