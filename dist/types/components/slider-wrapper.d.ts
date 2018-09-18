import { Component } from "preact";
import { SliderConfigProps } from "./slider";
export interface QSliderBreakpoints {
    [key: number]: Partial<QSliderProps>;
}
export interface QSliderProps extends SliderConfigProps {
    breakpoints?: QSliderBreakpoints;
}
interface QSliderState {
    ready: boolean;
    initialProps: QSliderProps;
    currentProps: QSliderProps;
}
export declare class QSlider extends Component<QSliderProps, QSliderState> {
    private store;
    constructor(props: QSliderProps);
    componentDidMount(): void;
    static defaultProps: Partial<QSliderProps>;
    private watchBreakpoints;
    render(): JSX.Element;
}
export {};
