import { Component, VNode } from "preact";
export interface SliderNavigationConfigProps {
    nextArrow?: VNode;
    prevArrow?: VNode;
}
export interface SliderNavigationProps extends SliderNavigationConfigProps {
    onNextArrowClick?: () => void;
    onPrevArrowClick?: () => void;
}
export declare class SliderNavigation extends Component<SliderNavigationProps, {}> {
    static defaultProps: {
        onNextArrowClick: () => void;
        onPrevArrowClick: () => void;
    };
    render(): JSX.Element;
}
