import Preact, { h } from 'preact';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DraggableTrack from './draggable-track.jsx';
import SlideTrack from './slide-track.jsx';
import SliderNavigation from './slider-navigation.jsx';
import { connect } from 'unistore/preact';
import actions from '../actions';


/**
 * Slider Component
 * 
 * This is the main component
 * 
 * @class Slider
 * @extends {Preact.Component}
 */
class Slider extends Preact.Component {
    constructor() {
        super();

        this.state = {
            renderChildren: false
        };

        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrev = this.gotoPrev.bind(this);
        this.gotoSlide = this.gotoSlide.bind(this);
    }

    componentWillMount() {
        this.slider = null;

        this.setMaxSlideOffset();
    }

    componentDidUpdate() {
        this.setMaxSlideOffset();
    }

    componentDidMount() {
        if (this.props.children) {
            this.setState({ renderChildren: true });
            this.props.setSlides(this.props.children);
        }
    }

    setMaxSlideOffset() {
        this.maxSlideOffset = this.props.slides.length - this.props.slidesToShow;
    }

    canGoPrev() {
        return this.props.currentSlide > 0;
    }

    canGoNext() {
        return this.props.currentSlide < this.maxSlideOffset;
    }

    gotoNext() {
        if (this.props.isFading) return;

        let slidesToAdvance;

        if (this.props.currentSlide + this.props.slidesToScroll <= this.maxSlideOffset) {
            slidesToAdvance = this.props.slidesToScroll;
        } else if (this.props.rewindOnEnd && this.props.currentSlide === this.maxSlideOffset) {
            slidesToAdvance = this.props.currentSlide * -1;
        } else {
            slidesToAdvance = this.maxSlideOffset - this.props.currentSlide;
        }

        this.props.setCurrentSlide(this.props.currentSlide + slidesToAdvance);
    }

    gotoPrev() {
        if (this.props.isFading) return;

        let slidesToGoBack;

        if (this.props.currentSlide - this.props.slidesToScroll >= 0) {
            slidesToGoBack = this.props.slidesToScroll;
        } else if (this.props.rewindOnEnd && this.props.currentSlide === 0) {
            slidesToGoBack = this.maxSlideOffset * -1;
        } else {
            slidesToGoBack = this.props.currentSlide;
        }

        this.props.setCurrentSlide(this.props.currentSlide - slidesToGoBack);
    }

    gotoSlide(slideIndex, returnIndex = false) {
        if (this.props.isFading) return;

        let nextSlide;

        if (slideIndex < 0) {
            nextSlide = this.props.fade ? this.maxSlideOffset : 0;
        } else if (slideIndex > this.maxSlideOffset) {
            nextSlide = this.props.fade ? 0 : this.maxSlideOffset;
        } else {
            nextSlide = slideIndex;
        }

        if (returnIndex) {
            return nextSlide;
        } else {
            this.props.setCurrentSlide(nextSlide);
        }
    }

    handlePrevClick() {
        if (this.props.rewindOnEnd || this.canGoPrev()) this.gotoPrev();
    }

    handleNextClick() {
        if (this.props.rewindOnEnd || this.canGoNext()) this.gotoNext();
    }

    getSliderWidth() {
        return this.slider.getBoundingClientRect().width;
    }

    handleSliderRef(element) {
        this.slider = element;
    }

    render() {
        return (
            this.props.slides.length > 0 && (
                <div className={classNames('q-slider__slider', { 'q-slider__slider_is-vertical': this.props.vertical })} ref={this.handleSliderRef.bind(this)}>
                    <DraggableTrack
                        vertical={this.props.vertical}
                        getSliderWidth={this.getSliderWidth.bind(this)}
                        slidesToScroll={this.props.slidesToScroll}
                        slidesToShow={this.props.slidesToShow}
                        gotoSlide={this.gotoSlide}
                    >
                        <SlideTrack
                            vertical={this.props.vertical}
                            fade={this.props.fade}
                            slidesToShow={this.props.slidesToShow}
                            fadeDuration={this.props.fadeDuration}
                        />
                    </DraggableTrack>
                    
                    {this.props.showArrows && (
                        <SliderNavigation
                            onNextClick={this.handleNextClick.bind(this)}
                            onPrevClick={this.handlePrevClick.bind(this)}
                            nextArrow={this.props.nextArrow}
                            prevArrow={this.props.prevArrow}
                        />
                    )}
                </div>
            )
        );
    }
}

Slider.propTypes = {
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    rewindOnEnd: PropTypes.bool,
    fade: PropTypes.bool,
    fadeDuration: PropTypes.number,
    showArrows: PropTypes.bool,
    nextArrow: PropTypes.element,
    prevArrow: PropTypes.element
};

Slider.defaultProps = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    fadeDuration: 500,
    showArrows: true
};

export default connect(['slides', 'isGrabbing', 'currentSlide', 'grabbedTrackOffset', 'isFading'], actions)(Slider);