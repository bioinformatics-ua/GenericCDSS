import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import {ProtocolActions} from '../../reflux/ProtocolReflux.js';
import History from '../globalComponents/History.js';

/**
 * Component to remove protocols
 * */
class RemoveProtocolButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRemoveMessage: false,
            showSuccessMessage: false
        };
    }

    askForRemoveProtocol = () => {
        this.setState({showRemoveMessage:true});
    };

    removeProtocol = () => {
        ProtocolActions.removeProtocol(this.props.protocolID);
        this.setState({
            showSuccessMessage:true,
            showRemoveMessage:false
        });
    };

    removedProtocolWithSuccess = () => {
        this.setState({showSuccessMessage:false});
        History.push('/protocols');
    };

    cancelRemoveProtocol = () => {
        this.setState({showRemoveMessage:false});
    };

    render() {
        return (
            <div>
                <button className="btn btn-sm btn-danger btn-150" onClick={this.askForRemoveProtocol}>
                    <strong><i className="fa fa-times"></i>&nbsp;Remove</strong>
                </button>
                {
                    this.state.showRemoveMessage ?
                        <SweetAlert warning
                                    showCancel
                                    confirmBtnText="Yes, remove it!"
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title="Are you sure?"
                                    onConfirm={this.removeProtocol}
                                    onCancel={this.cancelRemoveProtocol}
                        >
                            You will not be able to recover this protocol!
                        </SweetAlert> : ''
                }
                {
                    this.state.showSuccessMessage ?
                        <SweetAlert success title="Deleted!" onConfirm={this.removedProtocolWithSuccess}>
                            You protocol has been removed.
                        </SweetAlert>: ''
                }
            </div>
        );
    }

    static propTypes = {
        /**
         * Protocol id, somethimes it is necessary
         * */
        protocolID: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    };
}

export default RemoveProtocolButton;







