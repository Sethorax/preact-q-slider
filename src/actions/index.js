/**
 * Define all store actions
 */
export default store => ({
    setSlides: (state, slides) => ({ slides }),
    setGrabbingState: (state, isGrabbing) => ({ isGrabbing }),
    setGrabbedTrackOffset: (state, grabbedTrackOffset) => ({ grabbedTrackOffset }),
    setFadingState: (state, isFading) => ({ isFading }),
    setCurrentSlide: (state, currentSlide) => ({ lastSlide: state.currentSlide, currentSlide })
});