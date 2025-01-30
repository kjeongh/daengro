import { Inject, Injectable } from '@nestjs/common';
import type Redis from 'ioredis';
import { REDIS_CLIENT } from './constants/redis.constants';

@Injectable()
export class RedisService {
    constructor(
        @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
    ) {}

    /** 새 Lua스크립트 등록 */
    public defineCommand({
        name,
        luaText,
        numberOfKeys,
    }: {
        name: string,
        luaText: string,
        numberOfKeys: number,
    }) {
        this.redisClient.defineCommand(name, {
            numberOfKeys,
            lua: luaText
        });
    }

    // eval 명령어 사용
    public useCommand(command: string, keys: string[], args: string[]) {
        return this.redisClient[command](...keys, ...args);
    }

    // 초기화
    public async deleteSet(key: string) {
        await this.redisClient.del(key);
    };
}
