import {actions} from '@/store/modules/generic/actions';
import GenericService from '@/domain/services/GenericService';
import {Commit} from '@/store/types';
import {GenericState} from '@/store/modules/generic/types';

jest.mock('@/domain/services/GenericService');
const mockCommit: any = (type: string, payload: any): Commit<any> => ({type, payload});

describe('Successful Actions of Generic module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        GenericService.prototype.get = () => Promise.resolve(mockCommit('TEXT_UPDATED', null));
        GenericService.prototype.save = () => Promise.resolve(mockCommit('TEXT_UPDATED', null));
        GenericService.prototype.check = () => Promise.resolve(mockCommit('CHECK_STORE', true));
    });

    it('should getText emmit with TEXT_UPDATED', async () => {
        try {
            expect.assertions(1);

            const commit = mockCommit;
            const response = await (actions as any).getText({commit});
            expect(response).toEqual(commit('TEXT_UPDATED', null));
        } catch (error) {
            expect(error).toBeUndefined();
        }
    });

    it('should checkText emmit with CHECK_STORE', async () => {
        expect.assertions(1);
        const commit = mockCommit;

        const response = await (actions as any).checkStore({commit});

        expect(response).toEqual(commit('CHECK_STORE', true));
    });

    it('should setText emmit with TEXT_UPDATED', async () => {
        expect.assertions(1);
        const commit = mockCommit;

        const response = await (actions as any).setText({commit});
        expect(response).toEqual(commit('TEXT_UPDATED', null));
    });
});

describe('Failing Actions of Generic module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        GenericService.prototype.get = () => Promise.reject({type: 'STORE_ERROR', payload: null});
        GenericService.prototype.save = () => Promise.reject({type: 'STORE_ERROR', payload: null});
        GenericService.prototype.check = () => Promise.reject({type: 'STORE_ERROR', payload: null});
    });

    it('should getText emmit a STORE_ERROR', async () => {
        expect.assertions(1);
        return (actions as any).getText({commit: mockCommit})
            .then((response: Commit<GenericState>) => {
                expect(response.type).toEqual('STORE_ERROR');
            });
    });

    it('should setText emmit a STORE_ERROR', async () => {
        expect.assertions(1);
        return (actions as any).setText({commit: mockCommit})
            .then((response: Commit<GenericState>) => {
                expect(response.type).toEqual('STORE_ERROR');
            });
    });

    it('should setText emmit a STORE_ERROR', async () => {
        expect.assertions(1);
        return (actions as any).checkStore({commit: mockCommit})
            .then((response: Commit<GenericState>) => {
                expect(response.type).toEqual('STORE_ERROR');
            });
    });
});
