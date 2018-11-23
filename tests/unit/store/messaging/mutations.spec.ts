import {mutations} from '@/store/modules/messaging/mutations';
import { MessagingState } from '@/store/modules/messaging/types';
import { MessagingConfig } from '@/domain/entities/MessagingEntity';

describe('Landing/Mutations', () => {
    it('The state should change when the mutation is executed', () => {
        expect.assertions(1);
        let state: MessagingState;
        state = {
            config: {
              apiUrl: 'test',
              baseUrl: 'base',
              itemUrl: 'item',
              userId: 'no-id',
            },
        };
        const newConfig: MessagingConfig = {
            apiUrl: 'test2',
            baseUrl: 'base2',
            itemUrl: 'item2',
            userId: 'no-id2',
        };
        mutations.CONFIG_UPDATED(state, newConfig );

        expect(state.config).toEqual(newConfig);
    });
});
