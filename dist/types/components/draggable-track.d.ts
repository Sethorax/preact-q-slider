import { ComponentConstructor } from "preact";
export interface DraggableTrackProps {
    slidesToShow: number;
    vertical: boolean;
    gotoSlide: (index: number) => void;
    getSliderWidth: () => number;
}
export declare const DraggableTrack: ComponentConstructor<DraggableTrackProps, {}>;
