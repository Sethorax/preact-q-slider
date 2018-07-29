import { ComponentConstructor, h } from "preact";
import { StateMapper, ActionCreator, Store } from "unistore";
import { connect } from "unistore/preact";

// T - Wrapped component props
// S - Wrapped component state
// K - Store state
// I - Injected props to wrapped component
// A - Injected actions

export type ActionMapper<K, A> = (store: Store<K>) => A

export const connectClass = <T, S, K, I, A>(
    mapStateToProps: string | Array<string> | StateMapper<T, K, I>,
    actions?: ActionMapper<K, A>
) => (component: ComponentConstructor<T, S>) => {
    return connect<T, S, K, I>(mapStateToProps, actions)((props: T & I & A) => h(component, props));
};