import { ComponentConstructor } from "preact";
import { StateMapper, Store } from "unistore";
export declare type ActionMapper<K, A> = (store: Store<K>) => A;
export declare const connectClass: <T, S, K, I, A>(mapStateToProps: string | string[] | StateMapper<T, K, I>, actions?: ActionMapper<K, A>) => (component: ComponentConstructor<T, S>) => ComponentConstructor<T, S>;
