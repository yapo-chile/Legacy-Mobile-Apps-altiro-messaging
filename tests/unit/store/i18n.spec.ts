import {onTranslationNotFound} from '@/store/i18n';


describe('Store suite test', () => {
    it('i18n should show key name if no translation is available', () => {
        const message = onTranslationNotFound('es', '200');
        expect(message).toEqual('intl ok');
    });
    it('i18n should show key name if no translation is available', () => {
        const message = onTranslationNotFound('es', 'MADE_UP_KEY');
        expect(message).toBe('MADE_UP_KEY');
    });
});
