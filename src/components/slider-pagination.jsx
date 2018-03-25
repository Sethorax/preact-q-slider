import Preact, { h } from 'preact';
import classNames from 'classnames';
import { connect } from 'unistore/preact';

class SliderPagination extends Preact.Component {
    getAdjustedSlidesForPagination() {
        const sliceEnd = this.props.slides.length - this.props.slidesToShow + 1;
        return this.props.slides.slice(0, sliceEnd);
    }

    renderPaginationItem(key, isCurrent) {
        const props = {
            key,
            className: classNames('q-slider__pagination-item', { 'q-slider__pagination-item_is-current': isCurrent }),
            onClick: event => this.props.onPaginationItemClick(event, key)
        };

        return this.props.paginationItem ? Preact.cloneElement(this.props.paginationItem, props) : h('div', props);
    }

    render() {
        return (
            <div className="q-slider__pagination">
                {this.getAdjustedSlidesForPagination.bind(this)().map((slide, index) => this.renderPaginationItem(index, index === this.props.currentSlide))}
            </div>
        );
    }
}

export default connect(['slides', 'currentSlide'])(SliderPagination);