import { h, render } from "preact";
import { QSlider, QSliderProps, QSliderBreakpoints } from "../src/preact-q-slider";
import './app.scss';

const breakpoints: QSliderBreakpoints = {
    2: {
        slidesToScroll: 1
    }
}

const props: QSliderProps = {
    slidesHTML: '<div>1</div><div class="target">2</div><div>3</div>',
    slidesToShow: 2,
    slidesToScroll: 1,
    showArrows: true,
    rewindOnEnd: false
}

render(
<QSlider {...props}>
   
</QSlider>
, document.getElementById("root"));