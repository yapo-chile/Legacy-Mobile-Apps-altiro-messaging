export const onTranslationNotFound = (locale: string, key: string): string => {
    switch (key) {
        case '200':
            return 'intl ok';
        default:
            return key;
    }
};
