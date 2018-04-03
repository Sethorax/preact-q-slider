import Preact, { h } from 'preact';
import classNames from 'classnames';
import { connect } from 'unistore/preact';
import Utils from '../utils/index';
import actions from '../actions/index';

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

    componentWillMount() {
        this.onClickStartX = 0;
        this.onClickStartY = 0;
    }

    handleSlideMouseTouchDown(event) {
        this.onClickStartX = Utils.getClientPosFromTouchOrMouseEvent(event);
        this.onClickStartY = Utils.getClientPosFromTouchOrMouseEvent(event, true);
    }

    handleSlideClick(event, index) {
        if (this.onClickStartX !== Utils.getClientPosFromTouchOrMouseEvent(event) || this.onClickStartY !== Utils.getClientPosFromTouchOrMouseEvent(event, true)) return;

        if (typeof this.props.onSlideClick === 'function') {
            this.props.onSlideClick(event, index);
        }
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
                    <div key={index} onMouseDown={this.handleSlideMouseTouchDown.bind(this)} onTouchStart={this.handleSlideMouseTouchDown.bind(this)} onClick={event => this.handleSlideClick.bind(this)(event, index)} className="q-slider__slide" data-slide-index={index} style={this.props.vertical ? { height: `${slideWidth}%` } : { width: `${slideWidth}%` }}>{slide}</div>
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
                if (this.state.nextSlideIndex !== this.props.currentSlide) {
                    this.setState({
                        nextSlideIndex: this.props.currentSlide,
                        nextSlide: this.props.slides[this.props.currentSlide]
                    });
                } else {
                    this.props.setFadingState(true);
    
                    clearTimeout(this.fadeQueue);
                    this.fadeQueue = setTimeout(() => {
                        this.activeFadeSlide = (this.activeFadeSlide === 0) ? 1 : 0;
                        this.props.setFadingState(false);
                        this.setState({
                            currentSlideIndex: this.state.nextSlideIndex,
                            currentSlide: this.state.nextSlide
                        });
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
                className={classNames('q-slider__slide q-slider__slide_is-current', { 'q-slider__slide_is-active': this.activeFadeSlide === 0 })}
                    style={{
                        zIndex: this.activeFadeSlide === 0 ? 2 : 1,
                        opacity: this.activeFadeSlide === 0 && this.props.isFading ? 0 : 1,
                        transition: `opacity ${this.props.fadeDuration}ms ease`
                    }}>
                    {this.activeFadeSlide === 0 ? this.state.currentSlide : this.state.nextSlide}
                </div>
                <div
                    className={classNames('q-slider__slide q-slider__slide_is-next', { 'q-slider__slide_is-active': this.activeFadeSlide === 1 })}
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