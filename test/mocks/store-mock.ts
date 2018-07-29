import storeDependency = require('../../src/store/index');
import { Store } from 'unistore';
import { StoreState } from '../../src/store/index';

let instance: Store<StoreState> = null;

const getStore = () => {
    if (instance === null) {
        instance = storeDependency.getStore();
    }

    return instance;
};

export const mockStore = () => {
    const getStoreMock = jest.fn(() => getStore());

    jest.doMock("../../src/store/index", () => ({
        getStore: getStoreMock
    }));

    return getStoreMock;
};

export const resetStore = () => {
    if (instance !== null) {
        instance.setState(storeDependency.initialState);
    }
};