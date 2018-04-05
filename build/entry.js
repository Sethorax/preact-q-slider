import Preact, { h } from 'preact';
import QSlider from '../src/index';

Preact.render(
    <QSlider
        slidesToShow={3}
        slidesToScroll={1}
        rewindOnEnd={true}
    >
        <img src="https://picsum.photos/900/600/?image=174" />
        <img src="https://picsum.photos/900/600/?image=542" />
        <img src="https://picsum.photos/900/600/?image=347" />
        <img src="https://picsum.photos/900/600/?image=75" />
        <img src="https://picsum.photos/900/600/?image=541" />
        <img src="https://picsum.photos/900/600/?image=174" />
        <img src="https://picsum.photos/900/600/?image=542" />
        <img src="https://picsum.photos/900/600/?image=347" />
    </QSlider>
, document.querySelector('.imageslider'));

Preact.render(
    <QSlider
        slidesToShow={1}
        slidesToScroll={1}
        rewindOnEnd={true}
        fade={true}
        fadeDuration={1000}
        canMove={() => {return true}}
        beforeChange={() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 1000)
            })
        }}
        slidesHTML={'<img src="https://picsum.photos/900/600/?image=174" />'}
    >
    </QSlider>
, document.querySelector('.imageslider2'));