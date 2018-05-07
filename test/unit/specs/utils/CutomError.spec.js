import CustomError from '@/utils/CustomError';

describe('CustomError Test', () => {
  it('should return the error', () => {
    expect(CustomError({ error: 'error' })).toEqual({ error: 'error' });
  });
});
