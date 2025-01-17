import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplyService {
  getHello(): string {
    return 'Hello World!';
  }
}
