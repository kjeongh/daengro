export const TOPIC = {
    /**
     * 선착순 이벤트 토픽
     */
    APPLY_EVENT: 'apply-event',
}

export type Topic = typeof TOPIC[keyof typeof TOPIC];