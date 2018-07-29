export declare type MouseTouchEvent = MouseEvent | TouchEvent;
export declare const getClientPosFromTouchOrMouseEvent: (event: MouseTouchEvent, getY?: boolean) => number;
export declare const getNumericKeys: <T extends Object>(source: T) => number[];
