import { actions } from '@/store/modules/messaging/actions';
import { Commit } from '@/store/types.d';

const mockCommit: any = (type: string, payload: any): Commit<any> => ({ type, payload });

describe('Successful Actions of Messaging module', () => {
  it('should getText emmit with CONFIG_UPDATED', async () => {
    try {
      expect.assertions(1);

      const commit = mockCommit;
      const response = await (actions as any).setConfig({ commit }, 'payload');
      expect(response).toEqual(commit('CONFIG_UPDATED', 'payload'));
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
