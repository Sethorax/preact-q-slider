import { h , Component, ComponentConstructor, VNode } from "preact";
import classNames from "classnames";
import { Store } from "unistore";
import { PreactHTMLConverter } from "preact-html-converter";
import { StoreState } from "../store";
import { setSlides,setCurrentSlideIndex } from "../actions";
import { connectClass } from "../utils/preact-utils";
import { MouseTouchEvent } from "../utils/index";
import { SliderPagination, SliderPaginationConfigProps } from "./slider-pagination";
import { SliderNavigation, SliderNavigationConfigProps } from "./slider-navigation";
import { SlideTrack, SlideTrackConfigProps } from "./slide-track";
import { DraggableTrack } from "./draggable-track";

type ChildConfigProps = SliderPaginationConfigProps & SliderNavigationConfigProps & SlideTrackConfigProps;

export interface SliderConfigProps extends ChildConfigProps {
    slidesToShow?: number;
    slidesToScroll?: number;
    slidesHTML?: string;
    vertical?: boolean;
    fade?: boolean;
    fadeDuration?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    rewindOnEnd?: boolean;
    showArrows?: boolean;
    showPagination?: boolean;
    canMove?: () => boolean;
    beforeChange?: (currentSlideIndex: number, nextSlideIndex: number) => Promise<void> | void;
    afterChange?: (currentSlideIndex: number, previousSlideIndex: number) => Promise<void> | void;
    onNextClick?: (willChange: boolean, currentSlideIndex: number, nextSlideIndex: number) => Promise<void> | void;
    onPrevClick?: (willChange: boolean, currentSlideIndex: number, nextSlideIndex: number) => Promise<void> | void;
    onFirstSlideRender?: () => void;
}

export interface SliderProps extends SliderConfigProps {};

interface SliderState {
    renderChildren: boolean;
}

interface StoreProps {
    slides: VNode[];
    currentSlideIndex: number;
    isFading: boolean;
}

interface StoreActions {
    setSlides: Function;
    setCurrentSlideIndex: Function;
}

class SliderComponent extends Component<SliderProps & StoreProps & StoreActions, SliderState> {
    public state: {
        renderChildren: false
    }

    private slider: HTMLElement = null;
    private maxSlideOffset: number = null;
    private autoplayPaused: boolean = false;
    private autoplayCycle: number = null;
    private lastAutoplayCycleStart: number = 0;
    private remainingAutoplayCycleDuration: number = 0;
    private isWaitingForCallback: boolean = true;

    public constructor() {
        super();

        this.canMove = this.canMove.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrev = this.gotoPrev.bind(this);
        this.gotoSlide = this.gotoSlide.bind(this);
        this.getSliderWidth = this.getSliderWidth.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleSliderRef = this.handleSliderRef.bind(this);
        this.handlePaginationItemClick = this.handlePaginationItemClick.bind(this);
    }

    public componentWillMount() {
        this.setMaxSlideOffset();
    }

    public componentWillUnmount() {
        this.stopAutoplay();
    }

    public componentDidMount() {
        if (this.props.children.length > 0) {
            this.setState({ renderChildren: true });
            this.props.setSlides(this.props.children);
        } else if (this.props.slidesHTML) {
            const converter = PreactHTMLConverter();
            const slides = converter.convert(this.props.slidesHTML.trim());

            this.props.setSlides(slides);
        }

        if (this.props.autoplay) {
            this.startAutoplay();
        }
    }

    public componentDidUpdate(prevProps: SliderProps) {
        if (!prevProps.autoplay && this.props.autoplay) {
            this.startAutoplay();
        } else if (prevProps.autoplay && !this.props.autoplay) {
            this.stopAutoplay();
        }

        this.setMaxSlideOffset();
    }

    private startAutoplay() {
        const cycleDuration = this.remainingAutoplayCycleDuration > 0 && this.remainingAutoplayCycleDuration < this.props.autoplaySpeed ? this.remainingAutoplayCycleDuration : this.props.autoplaySpeed;
        this.runAutoplayCycle(cycleDuration);
    }

    private stopAutoplay() {
        this.remainingAutoplayCycleDuration = (new Date()).getTime() - this.remainingAutoplayCycleDuration;
        clearTimeout(this.autoplayCycle);
    }

    private runAutoplayCycle(cycleDuration: number) {
        this.autoplayCycle = setTimeout(() => {
            this.lastAutoplayCycleStart = (new Date()).getTime();
            this.runAutoplayCycle(cycleDuration);
            this.handleNextClick();
        }, cycleDuration);
    }

    private setMaxSlideOffset() {
        this.maxSlideOffset = this.props.slides.length - this.props.slidesToShow;
    }

    private canGoPrev() {
        return this.props.currentSlideIndex > 0;
    }

    private canGoNext() {
        return this.props.currentSlideIndex < this.maxSlideOffset;
    }

    private canMove() {
        if (this.props.isFading) return false;
        if (this.isWaitingForCallback === false) return false;
        if (this.props.canMove() === false) return false;

        return true;
    }

    private calculateSlidesToAdvance() {
        let slidesToAdvance: number;

        if (this.props.currentSlideIndex + this.props.slidesToScroll <= this.maxSlideOffset) {
            slidesToAdvance = this.props.slidesToScroll;
        } else if (this.props.rewindOnEnd && this.props.currentSlideIndex === this.maxSlideOffset) {
            slidesToAdvance = this.props.currentSlideIndex * -1;
        } else {
            slidesToAdvance = this.maxSlideOffset - this.props.currentSlideIndex;
        }

        return slidesToAdvance;
    }

    private gotoNext(slidesToAdvance?: number) {
        if (!this.canMove()) return;

        if (!slidesToAdvance) {
            slidesToAdvance = this.calculateSlidesToAdvance();
        }

        const nextSlideIndex = this.props.currentSlideIndex + slidesToAdvance;
        this.isWaitingForCallback = false;

        Promise.resolve(this.props.beforeChange(this.props.currentSlideIndex, nextSlideIndex)).then(() => {
            this.props.setCurrentSlideIndex(nextSlideIndex);

            this.isWaitingForCallback = true;
        });
    }

    private calculateSlidesToRegress() {
        let slidesToRegress: number;

        if (this.props.currentSlideIndex - this.props.slidesToScroll >= 0) {
            slidesToRegress = this.props.slidesToScroll;
        } else if (this.props.rewindOnEnd && this.props.currentSlideIndex === 0) {
            slidesToRegress = this.maxSlideOffset * -1;
        } else {
            slidesToRegress = this.props.currentSlideIndex;
        }

        return slidesToRegress;
    }

    private gotoPrev(slidesToRegress?: number) {
        if (!this.canMove()) return;

        if (!slidesToRegress) {
            slidesToRegress = this.calculateSlidesToRegress();
        }

        const nextSlideIndex = this.props.currentSlideIndex - slidesToRegress;
        this.isWaitingForCallback = false;
        Promise.resolve(this.props.beforeChange(this.props.currentSlideIndex, nextSlideIndex)).then(() => {
            this.props.setCurrentSlideIndex(nextSlideIndex);

            this.isWaitingForCallback = true;
        });
    }

    public gotoSlide(slideIndex: number, returnIndex = false): number|void {
        if (!this.canMove()) return;

        let nextSlideIndex: number;

        if (slideIndex < 0) {
            nextSlideIndex = this.props.fade ? this.maxSlideOffset : 0;
        } else if (slideIndex > this.maxSlideOffset) {
            nextSlideIndex = this.props.fade ? 0 : this.maxSlideOffset;
        } else {
            nextSlideIndex = slideIndex;
        }

        if (returnIndex) {
            return nextSlideIndex;
        }

        this.isWaitingForCallback = false;
        Promise.resolve(this.props.beforeChange(this.props.currentSlideIndex, nextSlideIndex)).then(() => {
            this.props.setCurrentSlideIndex(nextSlideIndex);

            this.isWaitingForCallback = true;
        });
    }

    public getSliderWidth() {
        return this.slider.getBoundingClientRect().width;
    }

    private handlePrevClick() {
        const willChange = (this.props.slides.length >= this.props.slidesToShow && this.props.rewindOnEnd) || this.canGoPrev();
        const slidesToRegress = this.calculateSlidesToRegress();

        Promise.resolve(this.props.onPrevClick(willChange, this.props.currentSlideIndex, this.props.currentSlideIndex - slidesToRegress)).then(() => {
            if (willChange) this.gotoPrev(slidesToRegress);
        });
    }

    private handleNextClick() {
        const willChange = (this.props.slides.length >= this.props.slidesToShow && this.props.rewindOnEnd) || this.canGoNext();
        const slidesToAdvance = this.calculateSlidesToAdvance();

        Promise.resolve(this.props.onNextClick(willChange, this.props.currentSlideIndex, this.props.currentSlideIndex + slidesToAdvance)).then(() => {
            if (willChange) this.gotoNext();
        });
    }

    private handlePaginationItemClick(event: MouseTouchEvent, key: number) {
        if (this.props.slides.length < this.props.slidesToShow) return;

        this.gotoSlide(key);
    }

    private handleSliderRef(element: HTMLElement) {
        this.slider = element;
    }

    public render() {
        return (
            this.props.slides.length > 0 && (
                <div ref={this.handleSliderRef} className={classNames('q-slider__slider', { 'q-slider__slider_is-vertical': this.props.vertical, 'q-slider__slider_no-sliding': this.props.slides.length <= this.props.slidesToShow })}>
                    <DraggableTrack
                        slidesToShow={this.props.slidesToShow}
                        vertical={this.props.vertical}
                        gotoSlide={this.gotoSlide}
                        getSliderWidth={this.getSliderWidth}
                    >
                        <SlideTrack
                            fade={this.props.fade}
                            fadeDuration={this.props.fadeDuration}
                            vertical={this.props.vertical}
                            slidesToShow={this.props.slidesToShow}
                            onSlideClick={this.props.onSlideClick}
                            afterChange={this.props.afterChange}
                        />
                    </DraggableTrack>

                    {this.props.showArrows && this.props.slides.length > 1 && (
                        <SliderNavigation
                            onNextArrowClick={this.handleNextClick}
                            onPrevArrowClick={this.handlePrevClick}
                            nextArrow={this.props.nextArrow}
                            prevArrow={this.props.prevArrow}
                        />
                    )}

                    {this.props.showPagination && this.props.slides.length > 1 && (
                        <SliderPagination
                            slidesToShow={this.props.slidesToShow}
                            onPaginationItemClick={this.handlePaginationItemClick}
                            onPaginationItemRender={this.props.onPaginationItemRender}
                        />
                    )}
                </div>
            )
        );
    }
}

const mapStateToProps = (state: StoreState): StoreProps => ({
    slides: state.slides,
    isFading: state.isFading,
    currentSlideIndex: state.currentSlideIndex
});

const mapActionsToProps = (store: Store<StoreState>): StoreActions => ({
    setSlides,
    setCurrentSlideIndex
});

export const Slider = connectClass<SliderProps, SliderState, StoreState, StoreProps, StoreActions>(mapStateToProps, mapActionsToProps)(SliderComponent);