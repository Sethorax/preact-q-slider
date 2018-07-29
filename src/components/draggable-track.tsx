import { h, Component, ComponentConstructor, VNode } from "preact";
import { Store } from "unistore";
import classNames from "classnames";
import { StoreState } from "../store";
import { setGrabbingState, setGrabbedTrackOffset } from "../actions";
import { connectClass } from "../utils/preact-utils";
import { getClientPosFromTouchOrMouseEvent, MouseTouchEvent } from "../utils/index";

export interface DraggableTrackProps {
    slidesToShow: number;
    vertical: boolean;
    gotoSlide: (index: number) => void;
    getSliderWidth: () => number;
}

interface StoreProps {
    slides: VNode[];
    currentSlideIndex: number;
    grabbedTrackOffset: number;
    isGrabbing: boolean;
}

interface StoreActions {
    setGrabbingState: Function;
    setGrabbedTrackOffset: Function;
}

class DraggableTrackComponent extends Component<DraggableTrackProps & StoreProps & StoreActions, {}> {
    private grabbedStartingX: number = 0;

    public constructor() {
        super();

        this.handleMouseTouchDown = this.handleMouseTouchDown.bind(this);
        this.handleMouseTouchMove = this.handleMouseTouchMove.bind(this);
        this.handleMouseTouchUp = this.handleMouseTouchUp.bind(this);
    }

    private handleMouseTouchDown(event: MouseTouchEvent) {
        if (this.props.slides.length <= this.props.slidesToShow) return;

        const clientX = getClientPosFromTouchOrMouseEvent(event, this.props.vertical);

        this.grabbedStartingX = clientX;
        this.props.setGrabbingState(true);
    }

    private handleMouseTouchMove(event: MouseTouchEvent) {
        if (!this.props.isGrabbing || this.props.slides.length <= this.props.slidesToShow) return;

        const clientX = getClientPosFromTouchOrMouseEvent(event, this.props.vertical);
        const distance = (this.grabbedStartingX - clientX) * 100 / this.props.getSliderWidth();
        this.props.setGrabbedTrackOffset(distance);
    }

    private handleMouseTouchUp() {
        if (this.props.slides.length <= this.props.slidesToShow) return;

        this.grabbedStartingX = 0;

        let draggedSlides = this.props.grabbedTrackOffset / (100 / this.props.slidesToShow);
        draggedSlides = (draggedSlides > 0) ? Math.ceil(draggedSlides) : Math.floor(draggedSlides);

        if (draggedSlides !== 0) {
            this.props.gotoSlide(this.props.currentSlideIndex + draggedSlides);
        }

        this.props.setGrabbedTrackOffset(0);
        this.props.setGrabbingState(false);
    }

    public render() {
        return (
            <div
                className="q-slider__draggable-track"
                onMouseDown={this.handleMouseTouchDown}
                onTouchStart={this.handleMouseTouchDown}
                onMouseMove={this.handleMouseTouchMove}
                onTouchMove={this.handleMouseTouchMove}
                onMouseUp={this.handleMouseTouchUp}
                onMouseOut={this.handleMouseTouchUp}
                onTouchEnd={this.handleMouseTouchUp}
            >
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex,
    grabbedTrackOffset: state.grabbedTrackOffset,
    isGrabbing: state.isGrabbing,
});

const mapActionsToProps = (store: Store<StoreState>) => ({
    setGrabbingState,
    setGrabbedTrackOffset
});

export const DraggableTrack = connectClass<DraggableTrackProps, {}, StoreState, StoreProps, StoreActions>(mapStateToProps, mapActionsToProps)(DraggableTrackComponent);