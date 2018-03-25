import Preact, { h } from 'preact';
import { createQSlider, resetQSlider, setQSliderProps } from './components/qslider';
import { store, resetStore } from './mocks/store-mock';
import { matchMediaMock, matchMediaAddListenerMock, resetMachMediaMocks } from './mocks/match-media-mock';
import Slider from '../src/components/slider';
import DraggableTrack from '../src/components/draggable-track';
import SlideTrack from '../src/components/slide-track';
import SliderNavigation from '../src/components/slider-navigation';
import SliderPagination from '../src/components/slider-pagination';

describe('Full QSlider Component', () => {
    beforeEach(() => {
        resetQSlider();
        resetStore();
    });

    it('should always render the Slider component', async () => {
        const qSlider = await createQSlider();
        expect(qSlider.find(Slider).length).toBe(1);
    });

    describe('has autoplay enabled', () => {
        beforeEach(() => {
            resetQSlider({
                slidesToShow: 3,
                slidesToScroll: 1,
                rewindOnEnd: true,
                autoplay: true,
                autoplaySpeed: 100,
                slidesHTML: '<div>slide 1</div><div>slide 2</div><div>slide 3</div><div>slide 4</div><div>slide 5</div>'
            }); 
        });

        it('should advance one slide each 100ms automatically', async (done) => {
            const qSlider = await createQSlider();
            expect(store().getState().currentSlide).toBe(0);

            Promise.all([
                new Promise(resolve => {
                    setTimeout(() => {
                        expect(store().getState().currentSlide).toBe(0);
                        resolve();
                    }, 50);
                }),
                new Promise(resolve => {
                    setTimeout(() => {
                        expect(store().getState().currentSlide).toBe(1);
                        resolve();
                    }, 100);
                }),
                new Promise(resolve => {
                    setTimeout(() => {
                        expect(store().getState().currentSlide).toBe(1);
                        resolve();
                    }, 150);
                }),
                new Promise(resolve => {
                    setTimeout(() => {
                        expect(store().getState().currentSlide).toBe(2);
                        resolve();
                    }, 250);
                }),
                new Promise(resolve => {
                    setTimeout(() => {
                        expect(store().getState().currentSlide).toBe(2);
                        resolve();
                    }, 531);
                })
            ]).then(() => done());
        });
    });

    describe('enabled fade transitions', () => {
        beforeEach(() => {
            resetQSlider({
                slidesToShow: 3,
                slidesToScroll: 2,
                fade: true,
                fadeDuration: 50,
                slidesHTML: '<div>slide 1</div><div>slide 2</div><div>slide 3</div><div>slide 4</div><div>slide 5</div>'
            }); 
        });

        it('should correctly set fade prop for child components', async () => {
            const qSlider = await createQSlider();
            expect(qSlider.find(SlideTrack).attr('fade')).toBeTruthy();
        });

        it('should change to slidesToShow = 1 if fade is enabled', async () => {
            const qSlider = await createQSlider();
            expect(qSlider.find(Slider).attr('slidesToShow')).toBe(1);
        });

        it('should change to slidesToScroll = 1 if fade is enabled', async () => {
            const qSlider = await createQSlider();
            expect(qSlider.find(Slider).attr('slidesToScroll')).toBe(1);
        });

        it('should transition to next slide if next button is clicked', async () => {
            const qSlider = await createQSlider();

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_next').simulate('click');
            expect(store().getState().currentSlide).toBe(1);
        });

        // TODO: Fix test
        /*it('should only queue one transition at a time', async () => {
            const qSlider = await createQSlider({ fadeDuration: 500 });

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_next').simulate('click');
            qSlider.find('.q-slider__arrow_next').simulate('click');
            qSlider.find('.q-slider__arrow_next').simulate('click');
            qSlider.find('.q-slider__arrow_next').simulate('click');
            qSlider.find('.q-slider__arrow_next').simulate('click');
            expect(store().getState().currentSlide).toBe(1);
        });*/

        it('should transition to slide 2 if next button is clicked if track is not fading', async (done) => {
            const qSlider = await createQSlider();

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_next').simulate('click');
            expect(store().getState().currentSlide).toBe(1);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(2);
                done();
            }, 60);
        });

        it('should should transition to last slide and stay there even if next button is clicked multiple times', async (done) => {
            const qSlider = await createQSlider();

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_next').simulate('click');
            expect(store().getState().currentSlide).toBe(1);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(2);
            }, 60);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(3);
            }, 120);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(4);
            }, 180);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(4);
            }, 240);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(4);
                done();
            }, 300);
        });

        it('should not transition backwards if at slide 0', async () => {
            const qSlider = await createQSlider();

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_prev').simulate('click');
            expect(store().getState().currentSlide).toBe(0);
        });
    });

    describe('enabled fade transitions and rewind', () => {
        beforeEach(() => {
            resetQSlider({
                slidesToShow: 1,
                slidesToScroll: 1,
                rewindOnEnd: true,
                fade: true,
                fadeDuration: 50,
                slidesHTML: '<div>slide 1</div><div>slide 2</div><div>slide 3</div>'
            });
        });

        it('should rewind backwards if at slide 0 and prev button is clicked', async () => {
            const qSlider = await createQSlider();

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_prev').simulate('click');
            expect(store().getState().currentSlide).toBe(2);
        });

        it('should rewind if at last slide', async (done) => {
            const qSlider = await createQSlider();

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_next').simulate('click');
            expect(store().getState().currentSlide).toBe(1);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(2);
            }, 60);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(0);
            }, 120);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_next').simulate('click');
                expect(store().getState().currentSlide).toBe(1);
                done();
            }, 180);
        });

        it('should rewind backwards infinitely if prev button is clicked multiple times', async (done) => {
            const qSlider = await createQSlider();

            expect(store().getState().currentSlide).toBe(0);
            qSlider.find('.q-slider__arrow_prev').simulate('click');
            expect(store().getState().currentSlide).toBe(2);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_prev').simulate('click');
                expect(store().getState().currentSlide).toBe(1);
            }, 60);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_prev').simulate('click');
                expect(store().getState().currentSlide).toBe(0);
            }, 120);

            setTimeout(() => {
                qSlider.find('.q-slider__arrow_prev').simulate('click');
                expect(store().getState().currentSlide).toBe(2);
                done();
            }, 180);
        });
    });
});