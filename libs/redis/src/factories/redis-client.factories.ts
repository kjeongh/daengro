import type { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

export const connectRedis = (configService: ConfigService) => {
    return new Redis({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
    });
}