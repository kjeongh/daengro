-- 선착순 10000명을 관리하기 위한 Redis Lua스크립트

local zsetKey = KEYS[1]
local value = ARGV[1]

-- 10000명까지만 받도록 함
local limit = 10000

-- 현재 시간 가져오기 (초 + 마이크로초)
local currentTime = redis.call("TIME")
local timestamp = currentTime[1] + (currentTime[2] / 1000000)

-- 현재 Set의 아이템 개수 확인
local currentCount = redis.call("ZCARD", zsetKey)

-- 개수가 제한을 초과하면 -1 반환
if currentCount >= limit then
    return -1
end

-- NX옵션으로 중복되는 값은 추가하지 않도록 함
local addedCount = redis.call("ZADD", zsetKey, "NX", timestamp, value)
return addedCount