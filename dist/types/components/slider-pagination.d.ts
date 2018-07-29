import { ComponentConstructor, VNode, Attributes } from "preact";
export interface SliderPaginationConfigProps {
    onPaginationItemRender?: (props: PaginationItemProps, key: number, currentSlideIndex: number) => PaginationItemProps;
}
export interface SliderPaginationProps extends SliderPaginationConfigProps {
    slidesToShow: number;
    paginationItem?: VNode;
    onPaginationItemClick?: (event: Event, key: number) => void;
}
export declare type PaginationItemProps = Attributes & JSX.HTMLAttributes;
export declare const SliderPagination: ComponentConstructor<SliderPaginationProps, {}>;
