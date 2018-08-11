export type MouseTouchEvent = MouseEvent | TouchEvent;

export const getClientPosFromTouchOrMouseEvent = (event: MouseTouchEvent, getY = false) => {
    if (isTouchEvent(event)) {
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

const isTouchEvent = (event: Event): event is TouchEvent => {
    return (event as TouchEvent).touches !== undefined && (event as TouchEvent).touches.length > 0;
}