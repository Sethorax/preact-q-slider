import { h, Component } from 'preact';

function mapActions(actions, store) {
	if (typeof actions==='function') actions = actions(store);
	let mapped = {};
	for (let i in actions) {
		mapped[i] = store.action(actions[i]);
	}
	return mapped;
}

function select(properties) {
	if (typeof properties==='string') properties = properties.split(/\s*,\s*/);
	return state => {
		let selected = {};
		for (let i=0; i<properties.length; i++) {
			selected[properties[i]] = state[properties[i]];
		}
		return selected;
	};
}

export const connect = jest.fn((mapStateToProps, actions) => {
    if (typeof mapStateToProps!=='function') {
		mapStateToProps = select(mapStateToProps || []);
	}

    return (component) => {
        return class Wrapper extends Component {
            private boundActions: any;

            componentWillMount() {
                this.state = mapStateToProps(this.context.store ? this.context.store.getState() : {}, this.props);
                this.boundActions = actions ? mapActions(actions, this.context.store) : { store: this.context.store };
            }

            update() {
                let mapped = mapStateToProps(this.context.store ? this.context.store.getState() : {}, this.props);
				for (let i in mapped) if (mapped[i]!==this.state[i]) {
					this.state = mapped;
					return this.setState(null);
				}
				for (let i in this.state) if (!(i in mapped)) {
					this.state = mapped;
					return this.setState(null);
				}
            }

            componentDidMount() {
                this.update();
                this.context.store.subscribe(this.update.bind(this));
            }

            componentWillUnmount() {
                this.context.store.unsubscribe(this.update.bind(this));
            }

            render() {
                return h(component, Object.assign(Object.assign(Object.assign({}, this.boundActions), this.props), this.state));;
            }
        }
    };
});

export function Provider(props) {
	this.getChildContext = () => ({ store: props.store });
}
Provider.prototype.render = props => props.children[0];