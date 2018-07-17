import utils from '@/utils/utils';

describe('utils test', () => {
    it('handle existOnArray true', () => {
        expect(utils.existOnArray(123, [123, 2354, 2323])).toBe(true);
    });

    it('handle existOnArray false', () => {
        expect(utils.existOnArray(234234, [123, 2354, 2323])).toBe(false);
    });

    it('should format a number to currency', () => {
        expect(utils.numberFormat('1000', 0)).toBe('1.000');
    });

    it('should format a string to currency', () => {
        expect(utils.numberFormat('1000', 0)).toBe('1.000');
    });

    it('should return 0  if isNaN', () => {
        expect(utils.numberFormat('hola', 0)).toBe('0');
    });

    it('should format a number UF', () => {
        expect(utils.normalizePrice('1000', 'uf')).toBe('UF 10,00');
    });
    it('should format a number peso', () => {
        expect(utils.normalizePrice('1000', 'peso')).toBe('$ 1.000');
    });

    it('should return false if not UF or peso', () => {
        expect(utils.normalizePrice('1000', 'hola')).toBe(false);
    });

    it('should normalize keys with "Price" key on Array', () => {
        const arr = [{Price: '2000', PriceUF: '120', Currency: 'uf'}, {Price: '3000', PriceUF: '', Currency: 'peso'}];
        expect(utils.normalizeKeys(arr)).toEqual([{
            currency: 'uf',
            price: '$ 2.000',
            priceUF: 'UF 1,20',
        }, {currency: 'peso', price: '$ 3.000', priceUF: ''}]);
    });

    it('should convert a unix timestamp date to date', () => {
        const unixTimestamp = 500520220;
        const date = utils.convertTimestamp(unixTimestamp);
        expect(date).toBe('1985-11-11 01:23');
    });
});
