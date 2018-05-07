import 'jest-localstorage-mock';
import store from '@/store/modules/generic';


describe('Actions of Generic module', () => {
  const mockCommit = (event, payload) => ({ event, payload });

  it('should getText emmit an TEXT_UPDATED', async () => {
    try {
      const commit = mockCommit;
      const response = await store.actions.getText({ commit });
      expect(response).toEqual(commit('TEXT_UPDATED', null));
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
