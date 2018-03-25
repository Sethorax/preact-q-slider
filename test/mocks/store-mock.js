import * as storeDependency from '../../src/store';

let mockedStore;
const createNewStore = storeDependency.createNewStore;

export const store = () => {
    if (!mockedStore) {
        mockedStore = createNewStore();
    }

    return mockedStore;
};

export const resetStore = () => {
    mockedStore = undefined;
};

storeDependency.createNewStore = jest.fn(() => {
    return store();
});

export const mockedStoreDependency = storeDependency;