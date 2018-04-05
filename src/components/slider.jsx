import Preact, { h } from 'preact';
import classNames from 'classnames';
import { PreactHTMLConverter } from 'preact-html-converter/browser';
import DraggableTrack from './draggable-track';
import SlideTrack from './slide-track';
import SliderNavigation from './slider-navigation';
import SliderPagination from './slider-pagination';
import { connect } from 'unistore/preact';
import actions from '../actions/index';

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

        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrev = this.gotoPrev.bind(this);
        this.gotoSlide = this.gotoSlide.bind(this);
        this.canMove = this.canMove.bind(this);
    }

    componentWillMount() {
        this.slider = null;
        this.autoplayPaused = false;
        this.autoplayCycle = null;
        this.lastAuoplayCycleStart = 0;
        this.remainingAutoplayCycleDuration = 0;
        this.isWaitingForCallback = true;

        this.setMaxSlideOffset();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.autoplay && this.props.autoplay) {
            this.startAutoplay();
        } else if (prevProps.autoplay && !this.props.autoplay) {
            this.stopAutoplay();
        }

        this.setMaxSlideOffset();
    }

    componentDidMount() {
        if (this.props.children.length > 0) {
            this.setState({ renderChildren: true });
            this.props.setSlides(this.props.children);
        } else if (this.props.slidesHTML) {
            const slides = (new PreactHTMLConverter()).convert(this.props.slidesHTML);

            if (slides.length) {
                this.props.setSlides(slides);
            } else {
                this.props.setSlides([slides]);
            }
        }

        if (this.props.autoplay === true) {
            this.startAutoplay();
        }
    }

    checkGotoSlideProp() {
        if (this.props.gotoSlide !== null) {
            this.gotoSlide(this.props.gotoSlide)
        }
    }

    startAutoplay() {
        const cycleDuration = this.remainingAutoplayCycleDuration > 0 && this.remainingAutoplayCycleDuration < this.props.autoplaySpeed ? this.remainingAutoplayCycleDuration : this.props.autoplaySpeed;
        this.runAutoplayCycle(cycleDuration);
    }

    stopAutoplay() {
        this.remainingAutoplayCycleDuration = (new Date()).getTime() - this.lastAuoplayCycleStart;
        clearTimeout(this.autoplayCycle);
    }

    runAutoplayCycle(cycleDuration = 1000) {
        this.autoplayCycle = setTimeout(() => {
            this.lastAuoplayCycleStart = (new Date()).getTime();
            this.runAutoplayCycle(cycleDuration);
            this.handleNextClick();
        }, cycleDuration);
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

    canMove() {
        if (this.props.isFading) return false;
        if (this.isWaitingForCallback === false) return false;
        if (this.props.canMove() === false) return false;

        return true;
    }

    gotoNext() {
        if (!this.canMove()) return;

        let slidesToAdvance;

        if (this.props.currentSlide + this.props.slidesToScroll <= this.maxSlideOffset) {
            slidesToAdvance = this.props.slidesToScroll;
        } else if (this.props.rewindOnEnd && this.props.currentSlide === this.maxSlideOffset) {
            slidesToAdvance = this.props.currentSlide * -1;
        } else {
            slidesToAdvance = this.maxSlideOffset - this.props.currentSlide;
        }

        if (this.props.beforeChange() && this.props.beforeChange().then) {
            this.isWaitingForCallback = false;
            this.props.beforeChange().then(() => {
                this.props.setCurrentSlide(this.props.currentSlide + slidesToAdvance);
                this.isWaitingForCallback = true;
            });
        } else {
            this.props.setCurrentSlide(this.props.currentSlide + slidesToAdvance);
        }
    }

    gotoPrev() {
        if (!this.canMove()) return;

        let slidesToGoBack;

        if (this.props.currentSlide - this.props.slidesToScroll >= 0) {
            slidesToGoBack = this.props.slidesToScroll;
        } else if (this.props.rewindOnEnd && this.props.currentSlide === 0) {
            slidesToGoBack = this.maxSlideOffset * -1;
        } else {
            slidesToGoBack = this.props.currentSlide;
        }

        if (this.props.beforeChange() && this.props.beforeChange().then) {
            this.isWaitingForCallback = false;
            this.props.beforeChange().then(() => {
                this.props.setCurrentSlide(this.props.currentSlide - slidesToGoBack);
                this.isWaitingForCallback = true;
            });
        } else {
            this.props.setCurrentSlide(this.props.currentSlide - slidesToGoBack);
        }
    }

    gotoSlide(slideIndex, returnIndex = false) {
        if (!this.canMove()) return;

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
            if (this.props.beforeChange() && this.props.beforeChange().then) {
                this.isWaitingForCallback = false;
                this.props.beforeChange().then(() => {
                    this.props.setCurrentSlide(nextSlide);
                    this.isWaitingForCallback = true;
                });
            } else {
                this.props.setCurrentSlide(nextSlide);
            }
        }
    }

    handlePrevClick() {
        if ((this.props.slides.length >= this.props.slidesToShow && this.props.rewindOnEnd) || this.canGoPrev()) this.gotoPrev();
    }

    handleNextClick() {
        if ((this.props.slides.length >= this.props.slidesToShow && this.props.rewindOnEnd) || this.canGoNext()) this.gotoNext();
    }

    handlePaginationItemClick(event, key) {
        if (this.props.slides.length < this.props.slidesToShow) return;

        this.gotoSlide(key);
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
                <div className={classNames('q-slider__slider', { 'q-slider__slider_is-vertical': this.props.vertical, 'q-slider__slider_no-sliding': this.props.slides.length <= this.props.slidesToShow })} ref={this.handleSliderRef.bind(this)}>
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
                            onSlideClick={this.props.onSlideClick}
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

                    {this.props.showPagination && (
                        <SliderPagination onPaginationItemClick={this.handlePaginationItemClick.bind(this)} slidesToShow={this.props.slidesToShow} />
                    )}
                </div>
            )
        );
    }
}

Slider.defaultProps = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    fadeDuration: 500,
    showArrows: true,
    showPagination: true,
    autoplay: false,
    autoplaySpeed: 1000,
    onSlideClick: () => {},
    canMove: () => {},
    beforeChange: () => {}
};


export default connect(['slides', 'isGrabbing', 'currentSlide', 'grabbedTrackOffset', 'isFading'], actions)(Slider);