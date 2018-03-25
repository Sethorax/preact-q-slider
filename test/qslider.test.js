import { createQSlider, resetQSlider, setQSliderProps } from './components/qslider';
import { store, resetStore } from './mocks/store-mock';
import { matchMediaMock, matchMediaAddListenerMock, resetMachMediaMocks } from './mocks/match-media-mock';
import Slider from '../src/components/slider';
import DraggableTrack from '../src/components/draggable-track';
import SlideTrack from '../src/components/slide-track';
import SliderNavigation from '../src/components/slider-navigation';
import SliderPagination from '../src/components/slider-pagination';

describe('Full QSlider Component', async () => {
    beforeEach(() => {
        resetQSlider();
        resetStore();
    });

    it('should always render the Slider component', async () => {
        const qSlider = await createQSlider();
        expect(qSlider.find(Slider).length).toBe(1);
    });

    describe('when breakpoints are defined', async () => {
        global.matchMedia = matchMediaMock;

        beforeEach(async () => {
            resetMachMediaMocks();
            resetQSlider({
                slidesToShow: 4,
                breakpoints: {
                    1200: { slidesToShow: 3 },
                    900: { slidesToShow: 2 },
                    600: { slidesToShow: 1 }
                }
            });
        });

        it('should register 4 media queries', async () => {
            await createQSlider();
            expect(matchMediaMock.mock.calls.length).toBe(4);
        });

        it('should correctly create media queries for the breakpoints', async () => {
            await createQSlider();
            expect(matchMediaMock.mock.calls[0][0]).toBe('(min-width: 0px) and (max-width: 600px)');
            expect(matchMediaMock.mock.calls[1][0]).toBe('(min-width: 601px) and (max-width: 900px)');
            expect(matchMediaMock.mock.calls[2][0]).toBe('(min-width: 901px) and (max-width: 1200px)');
            expect(matchMediaMock.mock.calls[3][0]).toBe('(min-width: 1201px)');
        });

        it('should not set breakpoints settings if screen size is bigger than biggest breakpoint', async () => {
            const qSlider = await createQSlider();

            expect(qSlider.state('currentProps').breakpoints).toBeDefined();
            expect(qSlider.state('currentProps').slidesToShow).toBe(4);
        });

        it('should change settings if screensize gets smaller and matches a breakpoint', async () => {
            const qSlider = await createQSlider();

            expect(qSlider.state('currentProps').slidesToShow).toBe(4);

            matchMediaAddListenerMock.mock.calls[2][0]({ matches: true });

            expect(qSlider.state('currentProps').slidesToShow).toBe(3);

            matchMediaAddListenerMock.mock.calls[1][0]({ matches: true });

            expect(qSlider.state('currentProps').slidesToShow).toBe(2);
        });

        it('should change settings if screensize gets smaller than the smallest breakpoint', async () => {
            const qSlider = await createQSlider();

            expect(qSlider.state('currentProps').slidesToShow).toBe(4);

            matchMediaAddListenerMock.mock.calls[0][0]({ matches: true });

            expect(qSlider.state('currentProps').slidesToShow).toBe(1);
        });

        it('should change settings if screensize gets bigger and matches breakpoint', async () => {
            const qSlider = await createQSlider();

            expect(qSlider.state('currentProps').slidesToShow).toBe(4);

            matchMediaAddListenerMock.mock.calls[1][0]({ matches: true });

            expect(qSlider.state('currentProps').slidesToShow).toBe(2);

            matchMediaAddListenerMock.mock.calls[2][0]({ matches: true });

            expect(qSlider.state('currentProps').slidesToShow).toBe(3);
        });

        it('should change settings if screensize gets bigger than the biggest breakpoint', async () => {
            const qSlider = await createQSlider();

            expect(qSlider.state('currentProps').slidesToShow).toBe(4);

            matchMediaAddListenerMock.mock.calls[3][0]({ matches: true });

            expect(qSlider.state('currentProps').slidesToShow).toBe(4);
        });

        it('should update props from rerender even if changed by breakpoints', async () => {
            let qSlider = await createQSlider();

            expect(qSlider.state('currentProps').slidesToShow).toBe(4);

            matchMediaAddListenerMock.mock.calls[1][0]({ matches: true });

            expect(qSlider.state('currentProps').slidesToShow).toBe(2);

            qSlider = await setQSliderProps({ slidesToShow: 1 });

            expect(qSlider.state('currentProps').slidesToShow).toBe(1);
        });
    });

    describe('when breakpoints are not defined', () => {
        global.matchMedia = matchMediaMock;

        beforeEach(() => {
            resetQSlider({ breakpoints: undefined });
            resetMachMediaMocks();
        });

        it('should not register media queries', () => {
            expect(matchMediaMock.mock.calls.length).toBe(0);
        });
    });
});