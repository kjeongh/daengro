import { Module } from '@nestjs/common';
import { ConfigModule as GlobalConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

/**
 * 전역 설정 모듈
 */
@Module({
  imports: [
    GlobalConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
