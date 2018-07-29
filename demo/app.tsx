import { h, render } from "preact";
import { QSlider, QSliderProps } from "../dist/preact-q-slider.es5";
import './app.scss';

const breakpoints: QSliderBreakpoints = {
    2: {
        slidesToScroll: 1
    }
}

const props: QSliderProps = {
    breakpoints,
    slidesHTML: `
    <img src="//placehold.it/100x50" alt=""/>
    <img src="//placehold.it/100x50" alt=""/>
    <img src="//placehold.it/100x50" alt=""/>
    <img src="//placehold.it/100x50" alt=""/>
    <img src="//placehold.it/100x50" alt=""/>
    <img src="//placehold.it/100x50" alt=""/>
    `
}

render(
<QSlider >
   
</QSlider>
, document.getElementById("root"));