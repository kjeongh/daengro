import { Controller, Get } from '@nestjs/common';
import { GrantService } from './grant.service';

@Controller()
export class GrantController {
  constructor(private readonly grantService: GrantService) {}

  @Get()
  getHello(): string {
    return this.grantService.getHello();
  }
}
