
/**
 * Utility class
 * 
 * @export
 * @class Utils
 */
export default class Utils {
    /**
     * Returns the x or y position of a mouse or touch event.
     * 
     * @static
     * @param {Event} event 
     * @param {boolean} [getY=false] 
     * @returns Int
     * @memberof Utils
     */
    static getClientPosFromTouchOrMouseEvent(event, getY = false) {
        if (event.touches) {
            return getY ? event.touches[0].clientY : event.touches[0].clientX;
        } else {
            return getY ? event.clientY : event.clientX;
        }
    }
}