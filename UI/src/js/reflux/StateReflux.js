import Reflux from 'reflux';

const StateActions = Reflux.createActions(['loadingStart', 'loadingEnd', 'closeModal', 'openModal', 'updateModal']);

class StateStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = StateActions;
        this.state = {
            loading: true,
            modalVisible: false,
            modalHeader: undefined,
            modalContent: undefined,
            modalFooter: undefined,
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

    onCloseModal() {
        this.setState({
            modalVisible: false,
            modalHeader: undefined,
            modalContent: undefined,
            modalFooter: undefined,
        });
        this.trigger();
    }

    onOpenModal(modalHeader, modalContent, modalFooter) {
        this.setState({
            modalVisible: true,
            modalHeader:modalHeader,
            modalContent: modalContent,
            modalFooter:modalFooter
        });
        this.trigger();
    }

    onUpdateModal(modalHeader, modalContent, modalFooter) {
        this.setState({
            modalHeader:modalHeader,
            modalContent: modalContent,
            modalFooter:modalFooter
        });
        this.trigger();
    }
}

export {StateStore, StateActions};
