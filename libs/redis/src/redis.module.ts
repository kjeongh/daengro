import { Module, type DynamicModule, type Provider } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_CLIENT } from './constants/redis.constants';
import { connectRedis } from './factories/redis-client.factories';
import { ConfigModule, ConfigService } from '@nestjs/config';

const RedisClientProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: connectRedis,
  inject: [ConfigService],
}

@Module({
  imports: [ConfigModule],
  providers: [RedisClientProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      providers: [RedisClientProvider, RedisService],
      exports: [REDIS_CLIENT, RedisService],
    }
  }
}
