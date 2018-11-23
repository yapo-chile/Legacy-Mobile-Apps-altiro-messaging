import { getters } from '@/store/modules/messaging/getters';

describe('store/messaging/getters', () => {
  it('should return the state', () => {
    expect.assertions(1);
    const getterQuery = {
      config: {
        title: 'mock-text',
        subtitle: 'mock-text',
      },
      error: { state: false },
    };
    const getterResult = (getters as any).config(getterQuery);

    expect(getterResult).toEqual(getterQuery.config);
  });
});
