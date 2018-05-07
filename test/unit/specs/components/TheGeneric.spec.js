import { mount } from 'vue-test-utils';
import store from '@/store/store';
import TheGeneric from '../../../../src/components/TheGeneric';

describe('TheGeneric test', () => {
  let comp;

  beforeEach(() => {
    comp = mount(TheGeneric, {
      store,
    });
  });
  it('should return true for setText dispatched action', () => {
    expect(comp.vm.saveText('hola')).resolves.toEqual(true);
  });
  it('should return true for getText dispatched action', () => {
    expect(comp.vm.getText()).resolves.toEqual(true);
  });
});
