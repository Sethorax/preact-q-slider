import { mockStore, resetStore } from './mocks/store-mock';
const getStoreMock = mockStore();

import { h } from'preact';
import { createSlider, resetSlider } from './components/slider';
import { DraggableTrack } from '../src/components/draggable-track';
import { SlideTrack } from '../src/components/slide-track';
import { SliderNavigation } from '../src/components/slider-navigation';
import { SliderPagination } from '../src/components/slider-pagination';

describe('Slider', () => {
    beforeEach(() => {
        resetSlider();
        resetStore();
    });

    describe('render slides passed as children', () => {
        beforeEach(() => {
            resetSlider({
                slidesToShow: 3,
                children: [
                    <div>slide 1</div>,
                    <div>slide 2</div>,
                    <div>slide 3</div>
                ]
            });
        });

        it('should render the draggable track', async () => {
            const slider = await createSlider();
            expect(slider.find(DraggableTrack).length).toBe(1);
        });

        it('should render the slide track', async () => {
            const slider = await createSlider();
            expect(slider.find(SlideTrack).length).toBe(1);
        });
    
        it('should render slider navigation as default', async () => {
            const slider = await createSlider();
            expect(slider.find(SliderNavigation).length).toBe(1);
        });
    
        it('should render slider pagination as default', async () => {
            const slider = await createSlider();
            expect(slider.find(SliderPagination).length).toBe(1);
        });
    
        it('should have 3 slides', async () => {
            const slider = await createSlider();
            expect(getStoreMock().getState().slides.length).toBe(3);
        });
    
        it('should render 3 slides', async () => {
            const slider = await createSlider();
            expect(slider.find('.q-slider__slide').length).toBe(3);
    
            for (let i = 0; i < 3; i++) {
                expect(slider.find('.q-slider__slide').at(i).text()).toBe(`slide ${i + 1}`);
            }
        });
    
        it('should start at slide index 0', async () => {
            const slider = await createSlider();
            expect(getStoreMock().getState().currentSlideIndex).toBe(0);
        });
    })

    describe('render slides passed as html string', () => {
        beforeEach(() => {
            resetSlider({
                children: undefined,
                slidesHTML: '<div>slide 1</div><div>slide 2</div><div>slide 3</div>'
            });
        });

        it('should have 3 slides', async () => {
            await createSlider();
            expect(getStoreMock().getState().slides.length).toBe(3);
        });

        it('should render 3 slides', async () => {
            const slider = await createSlider();
            expect(slider.find('.q-slider__slide').length).toBe(3);

            for (let i = 0; i < 3; i++) {
                expect(slider.find('.q-slider__slide').at(i).text()).toBe(`slide ${i + 1}`);
            }
        });

        it('should start at slide index 0', async () => {
            await createSlider();
            expect(getStoreMock().getState().currentSlideIndex).toBe(0);
        });
    });

    describe('has 5 slides and shows 3', () => {
        beforeEach(() => {
            resetSlider({
                slidesToShow: 3,
                children: [
                    h('div', { key: 1 }, 'slide 1'),
                    h('div', { key: 2 }, 'slide 2'),
                    h('div', { key: 3 }, 'slide 3'),
                    h('div', { key: 4 }, 'slide 4'),
                    h('div', { key: 5 }, 'slide 5')
                ]
            });
        });

        it('should goto slide 2', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);
            
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    slider.find('.q-slider__arrow_next').simulate('click'); 
                }, i * 100);
            }

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(2);
                done();
            }, 200);
        });
    
        it('should not break the sliding bounds.', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);

            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    slider.find('.q-slider__arrow_next').simulate('click'); 
                }, i * 100);
            }

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(2);

                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        slider.find('.q-slider__arrow_prev').simulate('click'); 
                    }, i * 100);

                    setTimeout(() => {
                        expect(getStoreMock().getState().currentSlideIndex).toBe(0);
                        done();
                    }, 500);
                }
            }, 500);
        });
    });

    describe('has 5 slides, shows 3, scrolls 1 and does not rewind', () => {
        beforeEach(() => {
            resetSlider({
                slidesToShow: 3,
                slidesToScroll: 1,
                rewindOnEnd: false,
                slidesHTML: '<div>slide 1</div><div>slide 2</div><div>slide 3</div><div>slide 4</div><div>slide 5</div>'
            });  
        });

        it('should start at slide 0', async () => {
            await createSlider();
            expect(getStoreMock().getState().currentSlideIndex).toBe(0);
        });

        it('should go to slide 1 if the next arrow is clicked', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);
            slider.find('.q-slider__arrow_next').simulate('click');

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(1);
                done();
            }, 100);
        });

        it('should go to slide 2 if the next arrow is clicked 2 times', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    slider.find('.q-slider__arrow_next').simulate('click'); 
                }, i * 100);
            }

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(2);
                done();
            }, 300);
        });
    });

    describe('has 5 slides, shows 3, scrolls 1 and does rewind', async ()  => {
        beforeEach(() => {
            resetSlider({
                slidesToShow: 3,
                slidesToScroll: 1,
                rewindOnEnd: true,
                slidesHTML: '<div>slide 1</div><div>slide 2</div><div>slide 3</div><div>slide 4</div><div>slide 5</div>'
            });
        });

        it('should go to slide 2 if the next arrow is clicked 2 times', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);

            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    slider.find('.q-slider__arrow_next').simulate('click'); 
                }, i * 100);
            }

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(2);
                done();
            }, 300);
        });

        it('should should go back to slide 0 if the next arrow is clicked 3 times', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);

            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    slider.find('.q-slider__arrow_next').simulate('click'); 
                }, i * 100);
            }

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(0);
                done();
            }, 400);
        });

        it('should rewind infinitely if the next arrow is clicked multiple times', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);

            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    slider.find('.q-slider__arrow_next').simulate('click'); 
                }, i * 100);
            }

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(1);
                done();
            }, 1100);
        });

        it('should not rewind backwards if prev arrow is clicked', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);
            slider.find('.q-slider__arrow_prev').simulate('click');

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(2);
                done();
            }, 100);
        });

        it('should rewind backwards infinitely if the prev arrow is clicked multiple times', async (done) => {
            const slider = await createSlider();

            expect(getStoreMock().getState().currentSlideIndex).toBe(0);

            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    slider.find('.q-slider__arrow_prev').simulate('click'); 
                }, i * 100);
            }

            setTimeout(() => {
                expect(getStoreMock().getState().currentSlideIndex).toBe(1);
                done();
            }, 900);
        });
    });
});