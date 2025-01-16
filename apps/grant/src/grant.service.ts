import { Injectable } from '@nestjs/common';

@Injectable()
export class GrantService {
  getHello(): string {
    return 'Hello World!';
  }
}
