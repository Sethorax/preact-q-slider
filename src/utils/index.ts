export type MouseTouchEvent = MouseEvent | TouchEvent;

export const getClientPosFromTouchOrMouseEvent = (event: MouseTouchEvent, getY = false) => {
    if (event instanceof TouchEvent) {
        return getY ? event.touches[0].clientY : event.touches[0].clientX;
    } else {
        return getY ? event.clientY : event.clientX;
    }
};

export const getNumericKeys = <T extends Object>(source: T): number[] => {
    const validKeys: number[] = [];

    Object.keys(source).forEach(key => {
        const numericKey = Number(key);

        if (Number(key)) {
            validKeys.push(numericKey);
        }
    });

    return validKeys;
}