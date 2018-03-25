import Preact, { h } from 'preact';
import { renderComponent } from '../utils';
import SliderNavigation from '../../src/components/slider-navigation';

let component = renderComponent();;
component.registerComponent(props => <SliderNavigation {...props} />);

export const createSliderNavigation = async (props = {}) => {
    return await component.render(props);
}

export const resetSliderNavigation = (props = {}) => {
    component.reset({
        nextArrow: undefined,
        PrevArrow: undefined,
        onClick: undefined
    }, props);
};

export const setSliderNavigationProps = async (newProps) => {
    return await component.setProps(newProps);
};