import Preact, { h } from 'preact';
import { deep } from "preact-render-spy";

export const renderComponent = () => ({
    props: {},
    componentCallback: null,
    mountedComponent: undefined,

    registerComponent(cb) {
        this.componentCallback = cb;
    },

    render(props = {}, force = false) {
        return new Promise(resolve => {
            if (this.mountedComponent && !force) return resolve(this.mountedComponent);

            this.mountedComponent = deep(this.componentCallback(Object.assign(this.props, props)), { depth: 20 });
            setTimeout(() => resolve(this.mountedComponent), 1);
        });
    },

    setProps(newProps) {
        return new Promise(resolve => {
            this.mountedComponent = undefined;
            this.render(newProps, true).then(resolve);
        });
    },

    reset(defaultProps = {}, props = {}) {
        this.props = Object.assign(defaultProps, props);
        this.mountedComponent = undefined;
    }
});

export const runSequential = (funcs: Array<Function>, delay: number, onFinish: Function, initialDelay = 0) => {
    let d = initialDelay;
    funcs.forEach((func: Function, index: number) => {
        setTimeout(() => {
            func();

            if (index === funcs.length - 1) {
                onFinish();
            }
        }, d);

        d += delay;
    });
};