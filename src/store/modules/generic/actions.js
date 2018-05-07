import GenericService from '@/services/generic/GenericService.ts';

const GenSrv = new GenericService();

export default {
  async setText({ commit }, data) {
    try {
      const actionResponse = await GenSrv.save(data || null);
      return commit(actionResponse.event, actionResponse.payload);
    } catch (error) {
      return error;
    }
  },
  async getText({ commit }) {
    try {
      const actionResponse = await GenSrv.get();
      return commit(actionResponse.event, actionResponse.payload);
    } catch (error) {
      return error;
    }
  },
  async checkStore() {
    try {
      return await GenSrv.check();
    } catch (error) {
      return error;
    }
  },
};
