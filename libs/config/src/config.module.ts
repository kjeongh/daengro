import { Module } from '@nestjs/common';
import { ConfigModule as GlobalConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import configuration from '../configuration';
/**
 * 전역 설정 모듈
 */
@Module({
  imports: [
    GlobalConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./libs/config/.env'],
      load: [configuration],
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
