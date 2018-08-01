import { h, Component, ComponentConstructor, VNode } from "preact";
import { Store } from "unistore";
import classNames from "classnames";
import { StoreState } from "../store";
import { setFadingState } from "../actions";
import { connectClass } from "../utils/preact-utils";
import { getClientPosFromTouchOrMouseEvent, MouseTouchEvent } from "../utils/index";

export interface SlideTrackConfigProps {
    onSlideClick?: (event: MouseTouchEvent, index: number) => void;
}

export interface SlideTrackProps extends SlideTrackConfigProps {
    slidesToShow: number;
    fade: boolean;
    fadeDuration: number;
    vertical?: boolean;
    afterChange: (currentSlideIndex: number, previousSlideIndex: number) => void;
}

interface SlideTrackState {
    currentSlide: VNode;
    currentSlideIndex: number;
    nextSlide: VNode;
    nextSlideIndex: number;
}

interface StoreProps {
    slides: VNode[];
    currentSlideIndex: number;
    grabbedTrackOffset: number;
    isGrabbing: boolean;
    isFading: boolean;
}

interface StoreActions {
    setFadingState: Function;
}

class SlideTrackComponent extends Component<SlideTrackProps & StoreProps & StoreActions, SlideTrackState> {
    public state: SlideTrackState = {
        currentSlideIndex: 0,
        currentSlide: null,
        nextSlide: null,
        nextSlideIndex: -1
    };

    public static defaultProps: Partial<SlideTrackProps> = {
        vertical: false,
        onSlideClick: () => {}
    };

    private onClickStartX: number = 0;
    private onClickStartY: number = 0;
    private fadeTimeout: number = null;
    private activeFadeSlide: number = 0;

    public constructor() {
        super();

        this.handleSlideClick = this.handleSlideClick.bind(this);
        this.handleSlideMouseTouchDown = this.handleSlideMouseTouchDown.bind(this);
    }

    public componentDidMount() {
        if (this.props.fade) {
            this.setState({
                currentSlide: this.props.slides[this.props.currentSlideIndex]
            });
        }
    }

    public componentDidUpdate(prevProps: SlideTrackProps & StoreProps & StoreActions) {
        if (this.props.fade) {
            if (!this.props.isFading && this.props.currentSlideIndex !== this.state.currentSlideIndex) {
                if (this.state.nextSlideIndex === this.props.currentSlideIndex) {
                    this.props.setFadingState(true);

                    clearTimeout(this.fadeTimeout);
                    this.fadeTimeout = setTimeout(() => {
                        this.activeFadeSlide = (this.activeFadeSlide === 0) ? 1 : 0;

                        this.props.setFadingState(false);
                        this.setState({
                            currentSlide: this.state.nextSlide,
                            currentSlideIndex: this.state.nextSlideIndex
                        });
                    }, this.props.fadeDuration);
                } else {
                    this.setState({
                        nextSlide: this.props.slides[this.props.currentSlideIndex],
                        nextSlideIndex: this.props.currentSlideIndex
                    });
                }
            }
        }

        if (this.props.currentSlideIndex !== prevProps.currentSlideIndex) {
            setTimeout(() => {
                this.props.afterChange(this.props.currentSlideIndex, prevProps.currentSlideIndex);
            }, this.props.fade ? this.props.fadeDuration : 300);
        }
    }

    public shouldComponentUpdate(nextProps: SlideTrackProps & StoreProps) {
        if (nextProps.isFading === false && this.props.isFading === true) {
            return false;
        }

        return true;
    }

    private handleSlideMouseTouchDown(event: MouseTouchEvent) {
        this.onClickStartX = getClientPosFromTouchOrMouseEvent(event);
        this.onClickStartY = getClientPosFromTouchOrMouseEvent(event, true);
    }

    private handleSlideClick(event: MouseTouchEvent, index: number) {
        if (this.onClickStartX !== getClientPosFromTouchOrMouseEvent(event) || this.onClickStartY !== getClientPosFromTouchOrMouseEvent(event, true)) return;

        this.props.onSlideClick(event, index);
    }

    private renderSlidingTrack() {
        const slideWidth = 100 / this.props.slidesToShow;
        const trackOffset = (slideWidth * this.props.currentSlideIndex * -1) - this.props.grabbedTrackOffset;

        return (
            <div
                className={classNames("q-slider__track", { "q-slider__track_no-transition": this.props.isGrabbing })}
                style={{ transform: this.props.vertical ? `translate3d(0, ${trackOffset}%, 0)` : `translate3d(${trackOffset}%, 0, 0)` }}
            >
                {this.props.slides.map((slide, index) => (
                    <div
                        key={index}
                        onMouseDown={this.handleSlideMouseTouchDown}
                        onTouchStart={this.handleSlideMouseTouchDown}
                        onClick={event => this.handleSlideClick(event, index)}
                        className="q-slider__slide"
                        data-slide-index={index}
                        style={this.props.vertical ? { height: `${slideWidth}%` } : { width: `${slideWidth}%` }}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        );
    }

    private renderFadingTrack() {
        return (
            <div className={classNames("q-slider__track q-slider__track_fading-track", { "q-slider__track_fading-track_is-fading": this.props.isFading })}>
                <div
                    className={classNames("q-slider__slide q-slider__slide_is-current", { "q-slider__slide_is-active": this.activeFadeSlide === 0 })}
                    style={{
                        zIndex: this.activeFadeSlide === 0 ? 2 : 1,
                        opacity: this.activeFadeSlide === 0 && this.props.isFading ? 0 : 1,
                        transition: `opacity ${this.props.fadeDuration}ms ease`
                    }}>
                    {this.activeFadeSlide === 0 ? this.state.currentSlide : this.state.nextSlide}
                </div>
                <div
                    className={classNames("q-slider__slide q-slider__slide_is-next", { "q-slider__slide_is-active": this.activeFadeSlide === 1 })}
                    style={{
                        zIndex: this.activeFadeSlide === 1 ? 2 : 1,
                        opacity: this.activeFadeSlide === 1 && this.props.isFading ? 0 : 1,
                        transition: `opacity ${this.props.fadeDuration}ms ease`
                    }}>
                        {this.activeFadeSlide === 1 ? this.state.currentSlide : this.state.nextSlide}
                </div>
            </div>
        );
    }

    public render() {
        if (this.props.slidesToShow === 1 && this.props.fade) {
            return this.renderFadingTrack();
        } else {
            return this.renderSlidingTrack();
        }
    }
}

const mapStateToProps = (state: StoreState) => ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex,
    grabbedTrackOffset: state.grabbedTrackOffset,
    isGrabbing: state.isGrabbing,
    isFading: state.isFading
});

const mapActionsToProps = (store: Store<StoreState>) => ({
    setFadingState
});

export const SlideTrack = connectClass<SlideTrackProps, SlideTrackState, StoreState, StoreProps, StoreActions>(mapStateToProps, mapActionsToProps)(SlideTrackComponent);