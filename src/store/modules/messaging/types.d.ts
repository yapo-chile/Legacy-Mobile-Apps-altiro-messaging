export interface StoreError {
    state: boolean;
    name?: string;
    message?: string;
    stack?: string;
}

export interface MessagingState {
    config: object;
}
