import {KafkaProducer} from "../../../src/utils/kafka/broker/kafka-producer";
import {UserCreatedListener} from "../../../src/listeners/user-created-listener";
import {UserCreated} from "../../../src/events/user-created";

describe('UserCreatedListener', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle UserCreated event and publish a message to Kafka', async () => {
        const userCreatedEvent = {
            user: { id: 1, email: 'test@example.com' },
        } as UserCreated;

        const mockProducer = {
            publishMessage: jest.fn(),
        } as unknown as KafkaProducer;

        const userCreatedListener = new UserCreatedListener(mockProducer);

        await userCreatedListener.handle(userCreatedEvent);

        expect(mockProducer.publishMessage).toHaveBeenCalledWith('user-created', {
            email: userCreatedEvent.user.email,
            original_id: userCreatedEvent.user.id,
        });
    });
});
