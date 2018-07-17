import {CRUD} from '@Yapo/ts-crud';

export const doneMockDS: CRUD = {
    $read: () => Promise.resolve({text: 'Prueba'}),
    $create: () => Promise.resolve({text: 'Prueba'}),
    $update: () => Promise.resolve(),
    $delete: () => Promise.resolve(),
};

export const failMockDS: CRUD = {
    $read: () => Promise.reject(),
    $create: () => Promise.reject(),
    $update: () => Promise.reject(),
    $delete: () => Promise.reject(),
};
