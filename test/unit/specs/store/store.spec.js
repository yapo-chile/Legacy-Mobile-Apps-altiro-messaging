import { onTranslationNotFound } from '@/store/store';

describe('Store suite test', () => {
  it('i18n should show key name if no translation is available', () => {
    const message = onTranslationNotFound('es', '200');
    expect(message).toEqual('intl ok');
  });
  it('i18n should show key name if no translation is available', () => {
    const message = onTranslationNotFound('es', null);
    expect(message).toBeNull();
  });
});
