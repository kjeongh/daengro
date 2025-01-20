export default () => ({
    kafkaOptions: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: process.env.KAFKA_BROKERS.split(','),
    }
})