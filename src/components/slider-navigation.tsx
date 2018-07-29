import { h, Component, VNode, cloneElement } from "preact";

export interface SliderNavigationConfigProps {
    nextArrow?: VNode;
    prevArrow?: VNode;
}

export interface SliderNavigationProps extends SliderNavigationConfigProps {
    onNextArrowClick?: () => void;
    onPrevArrowClick?: () => void;
}

export class SliderNavigation extends Component<SliderNavigationProps, {}> {
    public static defaultProps = {
        onNextArrowClick: () => {},
        onPrevArrowClick: () => {}
    }

    public render() {
        const nextArrow = this.props.nextArrow ? cloneElement(this.props.nextArrow, { onClick: this.props.onNextArrowClick }) : <div className="q-slider__arrow q-slider__arrow_next" onClick={this.props.onNextArrowClick} />;
        const prevArrow = this.props.prevArrow ? cloneElement(this.props.prevArrow, { onClick: this.props.onPrevArrowClick }) : <div className="q-slider__arrow q-slider__arrow_prev" onClick={this.props.onPrevArrowClick} />;

        return (
            <div className="q-slider__navigation">
                {prevArrow}
                {nextArrow}
            </div>
        );
    }
}