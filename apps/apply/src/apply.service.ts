import { KafkaService } from "@daengro/kafka";
import { TOPIC } from "@daengro/kafka/constants/topic.constants";
import { RedisService } from "@daengro/redis";
import { Injectable, type OnModuleInit } from "@nestjs/common";
import { APPLY_SCRIPT_NAME } from "./constants/apply.constants";
import * as fs from 'fs';
import * as path from "path";

@Injectable()
export class ApplyService implements OnModuleInit{
    constructor(
        private readonly kafka: KafkaService,
        private readonly redis: RedisService,
    ) {}

    // 모듈 초기화시 Lua스크립트 등록
    async onModuleInit() {
        
        const luaFilePath = path.join(process.cwd(), "apps/apply/src/scripts/apply-script.lua");
        const applyScript = await fs.promises.readFile(luaFilePath, 'utf-8');

        this.redis.defineCommand({
            name: APPLY_SCRIPT_NAME,
            luaText: applyScript,
            numberOfKeys: 1
        })
    }

    async applyEvent(userId: string): Promise<string> {
        // 선착순 안에 들었는지 검사
        const keys = ['apply:requests'];
        const args = [userId];
        const addedCount = this.redis.useCommand(APPLY_SCRIPT_NAME, keys, args);

        if(addedCount === -1) {
            console.log('이미 선착순 이벤트가 종료되었습니다.');
            throw new Error('이벤트 종료');
        }

        if(addedCount === 0) {
            console.log('이미 신청한 사용자입니다.');
            throw new Error('이미 신청함');
        }

        if(addedCount === 1) {
            console.log('신청 성공: ', userId);
        }

        // 선착순 안에 들었을 경우 kafka 메세지 전송
        await this.kafka.send({
            topic: TOPIC.APPLY_EVENT,
            messages: [
                {
                    value: JSON.stringify(userId),
                }
            ]
        })

        return userId;
    }
}