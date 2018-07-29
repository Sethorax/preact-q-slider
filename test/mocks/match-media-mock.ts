export const matchMediaAddListenerMock = jest.fn();
export const matchMediaMock = jest.fn(() => ({
    addListener: matchMediaAddListenerMock,
    matches: false
}));

export const resetMachMediaMocks = () => {
    matchMediaMock.mockClear();
    matchMediaAddListenerMock.mockClear();
}