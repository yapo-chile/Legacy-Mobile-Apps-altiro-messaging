export interface Commit<T> {
    type: string;
    payload?: T;
}

export interface RootState {
    version: string;
}
