import {GenericEntity} from '@/domain/entities/GenericEntity';

export interface StoreError {
    state: boolean;
    name?: string;
    message?: string;
    stack?: string;
}

export interface MessagingState extends GenericEntity {
    config: object;
}
