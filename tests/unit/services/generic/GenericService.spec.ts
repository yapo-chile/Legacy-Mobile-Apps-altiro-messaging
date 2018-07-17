import GenericService, {GenericInterface} from '@/domain/services/GenericService';
import {doneMockDS, failMockDS} from '../../__mocks__/datasource';


describe('GenericService test suite', () => {
    let svc: GenericInterface;
    beforeEach(() => {
        svc = new GenericService(doneMockDS);
    });
    it('should call the save data successfully', async () => {
        expect.assertions(2);
        const assertObject = {text: 'hola mundo'};
        spyOn(svc, 'save').and.callThrough();
        const result = await svc.save(assertObject);
        expect(svc.save).toBeCalled();
        expect(svc.save).toBeCalledWith(assertObject);
    });

    it('should call the get data successfully', async () => {
        expect.assertions(2);
        spyOn(svc, 'get').and.callThrough();
        const result = await svc.get();
        expect(svc.get).toBeCalled();
        expect(svc.get).toBeCalledWith();
    });

    it('should call the check data successfully', async () => {
        expect.assertions(2);
        spyOn(svc, 'check').and.callThrough();
        const result = await svc.check();
        expect(svc.check).toBeCalled();
        expect(svc.check).toBeCalledWith();
    });
});

describe('Test service errors', () => {
    let svc: GenericInterface;
    beforeEach(() => {
        svc = new GenericService(failMockDS);
    });
    it('should throw an error on save', () => {
        return svc.save({text: 'test'})
            .then((result) => {
                expect(result.type).toBe('STORE_ERROR');
            });
    });
    it('should throw an error on get', () => {
        return svc.get()
            .then((result) => {
                expect(result.type).toBe('STORE_ERROR');
            });
    });
    it('should throw an error on check', () => {
        return svc.check()
            .then((result) => {
                expect(result.type).toBe('STORE_ERROR');
            });
    });
});
