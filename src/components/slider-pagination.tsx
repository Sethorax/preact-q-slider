import { h, Component, ComponentConstructor, VNode, cloneElement, Attributes } from "preact";
import { StoreState } from "../store";
import { connectClass } from "../utils/preact-utils";
import classNames from "classnames";

export interface SliderPaginationConfigProps {
    onPaginationItemRender?: (props: PaginationItemProps, key: number, currentSlideIndex: number) => PaginationItemProps;
}

export interface SliderPaginationProps extends SliderPaginationConfigProps {
    slidesToShow: number;
    paginationItem?: VNode;
    onPaginationItemClick?: (event: Event, key: number) => void;
}

interface StoreProps {
    slides: VNode[];
    currentSlideIndex: number;
}

export type PaginationItemProps = Attributes & JSX.HTMLAttributes;

class SliderPaginationComponent extends Component<SliderPaginationProps & StoreProps, {}> {
    public static defaultProps: {
        onPaginationItemClick: () => {},
        onPaginationItemRender:  (props: PaginationItemProps, key: number, currentSlideIndex: number) => PaginationItemProps
    }

    public getNavigatableSlides() {
        const sliceEnd = this.props.slides.length - this.props.slidesToShow + 1;
        return this.props.slides.slice(0, sliceEnd);
    }

    public renderPaginationItem(key: number, isCurrent: boolean) {
        let props: PaginationItemProps = {
            key,
            className: classNames("q-slider__pagination-item", { "q-slider__pagination-item_is-current": isCurrent }),
            onClick: (event: Event) => this.props.onPaginationItemClick(event, key),
        };

        const modifiedProps = this.props.onPaginationItemRender(props, key, this.props.currentSlideIndex);
        if (typeof modifiedProps === "object") {
            props = {...props, ...modifiedProps};
        }

        return this.props.paginationItem ? cloneElement(this.props.paginationItem, props) : h("div", props);
    }

    public render() {
        return (
            <div className="q-slider__pagination">
                {this.getNavigatableSlides().map((_: VNode, index: number) => this.renderPaginationItem(index, index === this.props.currentSlideIndex))}
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex
});

export const SliderPagination = connectClass<SliderPaginationProps, {}, StoreState, StoreProps, {}>(mapStateToProps, null)(SliderPaginationComponent);