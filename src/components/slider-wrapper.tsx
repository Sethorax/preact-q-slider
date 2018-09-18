import { h, Component } from "preact";
import { Provider } from "unistore/preact";
import { Slider, SliderConfigProps } from "./slider";
import { getNumericKeys } from "../utils/index";
import { getStore, StoreState } from "../store";
import { PaginationItemProps } from "./slider-pagination";
import { Store } from "../../node_modules/unistore";

export interface QSliderBreakpoints {
  [key: number]: Partial<QSliderProps>;
}

export interface QSliderProps extends SliderConfigProps {
  breakpoints?: QSliderBreakpoints;
}

interface QSliderState {
  ready: boolean;
  initialProps: QSliderProps;
  currentProps: QSliderProps;
}

export class QSlider extends Component<QSliderProps, QSliderState> {
  private store: Store<StoreState> = getStore();

  public constructor(props: QSliderProps) {
    super(props);

    const initialProps = {
      ...props,
      slidesToScroll: props.fade ? 1 : props.slidesToScroll,
      slidesToShow: props.fade ? 1 : props.slidesToShow
    };

    this.state = {
      ready: false,
      initialProps: { ...initialProps },
      currentProps: initialProps
    };
  }

  public componentDidMount() {
    this.watchBreakpoints();
  }

  public static defaultProps: Partial<QSliderProps> = {
    slidesToShow: 3,
    slidesToScroll: 1,
    slidesHTML: null,
    fade: false,
    fadeDuration: 500,
    autoplay: false,
    autoplaySpeed: 6000,
    rewindOnEnd: true,
    showArrows: true,
    showPagination: true,
    onSlideClick: () => {},
    canMove: () => true,
    beforeChange: () => {},
    afterChange: () => {},
    onPaginationItemRender: (props: PaginationItemProps) => props,
    onNextClick: () => {},
    onPrevClick: () => {}
  };

  private watchBreakpoints() {
    if (this.props.breakpoints) {
      const onMediaQueryChange = (
        mediaQuery: MediaQueryList,
        props: Partial<QSliderProps>
      ) => {
        if (mediaQuery.matches) {
          const newProps = props !== null ? props : this.state.initialProps;

          this.setState({
            currentProps: { ...this.state.currentProps, ...newProps }
          });
        }
      };

      const registerMediaQuery = (
        queryString: string,
        props: Partial<QSliderProps>
      ) => {
        const mediaQuery = window.matchMedia(queryString);

        mediaQuery.addListener(mq => onMediaQueryChange(mq, props));
        onMediaQueryChange(mediaQuery, props);
      };

      let lastBreakpoint = -1;
      const breakpoints = getNumericKeys(this.props.breakpoints).sort(
        (a, b) => a - b
      );

      breakpoints.forEach(key => {
        registerMediaQuery(
          `(min-width: ${lastBreakpoint + 1}px) and (max-width: ${key}px)`,
          this.props.breakpoints[key]
        );
        lastBreakpoint = key;
      });

      registerMediaQuery(`(min-width: ${lastBreakpoint + 1}px)`, null);
    }

    this.setState({ ready: true });
  }

  public render() {
    return (
      this.state.ready && (
        <Provider store={this.store}>
          <Slider {...this.state.currentProps} />
        </Provider>
      )
    );
  }
}
