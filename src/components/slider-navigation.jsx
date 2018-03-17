import Preact, { h } from 'preact';

class SliderNavigation extends Preact.Component {
    render() {
        const NextArrow = this.props.nextArrow ? Preact.cloneElement(this.props.nextArrow, { onClick: this.props.onNextClick }) : <button onClick={this.props.onNextClick}>Next</button>;
        const PrevArrow = this.props.prevArrow ? Preact.cloneElement(this.props.prevArrow, { onClick: this.props.onPrevClick }) : <button onClick={this.props.onPrevClick}>Prev</button>;

        return (
            <div className="q-slider__navigation">
                {PrevArrow}
                {NextArrow}
            </div>
        );
    }
}

export default SliderNavigation;