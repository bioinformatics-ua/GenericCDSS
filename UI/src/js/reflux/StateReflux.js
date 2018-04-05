import Reflux from 'reflux';

const StateActions = Reflux.createActions(['loadingStart', 'loadingEnd']);

class StateStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = StateActions;
        this.state = {
            loading: true
        };
    }

    onLoadingStart() {
        this.setState({loading: true});
        this.trigger();
    }

    onLoadingEnd() {
        this.setState({loading: false});
        this.trigger();
    }
}

export {StateStore, StateActions};
