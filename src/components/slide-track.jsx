import Preact, { h } from 'preact';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'unistore/preact';
import actions from '../actions';

/**
 * @todo Move option-type props to the store
 * 
 * @class SlideTrack
 * @extends {Preact.Component}
 */
class SlideTrack extends Preact.Component {
    constructor() {
        super();

        this.state = {
            currentSlideIndex: 0,
            currentSlide: null,
            nextSlide: null,
            nextSlideIndex: -1
        };
    }

    renderSlidingTrack() {
        const slideWidth = 100 / this.props.slidesToShow;
        const trackOffset = (slideWidth * this.props.currentSlide * -1) - this.props.grabbedTrackOffset;

        return (
            <div
                className={classNames('q-slider__track', { 'q-slider__track_no-transition': this.props.isGrabbing })}
                style={{ transform: this.props.vertical ? `translate3d(0, ${trackOffset}%, 0)` : `translate3d(${trackOffset}%, 0, 0)` }}
            >
                {this.props.slides.map((slide, index) => (
                    <div key={index} className="q-slider__slide" style={this.props.vertical ? { height: `${slideWidth}%` } : { width: `${slideWidth}%` }}>{slide}</div>
                ))}
            </div>
        );
    }

    componentWillMount() {
        this.fadeQueue = null;
        this.activeFadeSlide = 0;
    }

    componentDidMount() {
        if (this.props.fade) {
            this.setState({
                currentSlide: this.props.slides[this.props.currentSlide]
            });
        }
    }

    componentDidUpdate() {
        if (this.props.fade) {
            if (this.props.currentSlide !== this.state.currentSlideIndex && !this.props.isFading) {
                let nextSlideIndex;
                let goForward = true;


                if (this.props.currentSlide !== 0 && this.props.lastSlide !== 0 && this.props.currentSlide > this.props.lastSlide) {
                    goForward = true;
                } else if (this.props.currentSlide !== 0 && this.props.lastSlide !== 0) {
                    goForward = false;
                } else if (this.props.lastSlide === 0 && this.props.currentSlide === 1) {
                    goForward = true;
                } else if (this.props.currentSlide === 0 && this.props.lastSlide === 1) {
                    goForward = false;
                } else if (this.props.currentSlide === 0 && this.props.lastSlide !== 1) {
                    goForward = true;
                } else if (this.props.lastSlide === 0) {
                    goForward = false;
                }

                if (goForward) {
                    nextSlideIndex = (this.state.currentSlideIndex < this.props.slides.length - 1) ? this.state.currentSlideIndex + 1 : 0;
                } else {
                    nextSlideIndex = (this.state.currentSlideIndex > 0) ? this.state.currentSlideIndex - 1 : this.props.slides.length - 1;
                }
                
                if (this.state.nextSlideIndex !== nextSlideIndex) {
                    this.setState({
                        nextSlide: this.props.slides[nextSlideIndex],
                        nextSlideIndex
                    });
                } else {
                    this.props.setFadingState(true);

                    clearTimeout(this.fadeQueue);
                    this.fadeQueue = setTimeout(() => {
                        this.activeFadeSlide = (this.activeFadeSlide === 0) ? 1 : 0;
                        this.props.setFadingState(false);
                        this.setState({ currentSlideIndex: this.props.currentSlide, currentSlide: this.props.slides[this.props.currentSlide] });
                    }, this.props.fadeDuration);
                }
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.isFading === false && this.props.isFading === true) {
            return false;
        }

        return true;
    }

    renderFadingTrack() {
        return (
            <div className={classNames('q-slider__track q-slider__track_fading-track', { 'q-slider__track_fading-track_is-fading': this.props.isFading })}>
                <div
                    className="q-slider__slide q-slider__slide_is-current"
                    style={{
                        zIndex: this.activeFadeSlide === 0 ? 2 : 1,
                        opacity: this.activeFadeSlide === 0 && this.props.isFading ? 0 : 1,
                        transition: `opacity ${this.props.fadeDuration}ms ease`
                    }}>
                    {this.activeFadeSlide === 0 ? this.state.currentSlide : this.state.nextSlide}
                </div>
                <div
                    className="q-slider__slide q-slider__slide_is-next"
                    style={{
                        zIndex: this.activeFadeSlide === 1 ? 2 : 1,
                        opacity: this.activeFadeSlide === 1 && this.props.isFading ? 0 : 1,
                        transition: `opacity ${this.props.fadeDuration}ms ease`
                    }}>
                        {this.activeFadeSlide === 1 ? this.state.currentSlide : this.state.nextSlide}
                </div>
            </div>
        )
    }

    render() {
        if (this.props.slidesToShow === 1 && this.props.fade) {
            return this.renderFadingTrack();
        } else {
            return this.renderSlidingTrack();
        }
    }
}

export default connect(['slides', 'isGrabbing', 'currentSlide', 'lastSlide', 'grabbedTrackOffset', 'isFading'], actions)(SlideTrack);