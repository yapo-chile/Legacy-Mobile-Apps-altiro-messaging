import env from '@/utils/env';

describe('utils test', () => {
  it('handle env element', () => {
    expect(env.dataEnv('accSession')).toEqual('');
  });
});
