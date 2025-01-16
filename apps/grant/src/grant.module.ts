import { Module } from '@nestjs/common';
import { GrantController } from './grant.controller';
import { GrantService } from './grant.service';

@Module({
  imports: [],
  controllers: [GrantController],
  providers: [GrantService],
})
export class GrantModule {}
