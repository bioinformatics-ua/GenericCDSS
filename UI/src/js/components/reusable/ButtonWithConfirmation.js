import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import History from '../globalComponents/History.js';

/**
 * Component to execute an action with a confirmation before execute it
 * */
class ButtonWithConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRemoveMessage: false,
            showSuccessMessage: false
        };
    }

    askForAction = () => {
        this.setState({showRemoveMessage:true});
    };

    action = () => {
        this.props.action();
        this.setState({
            showSuccessMessage:true,
            showRemoveMessage:false
        });
    };

    actionExecutedWithSuccess = () => {
        this.setState({showSuccessMessage:false});
        if (this.props.redirect)
            History.push(this.props.redirect);
    };

    cancel = () => {
        this.setState({showRemoveMessage:false});
    };

    render() {
        return (
            <div>
                <button className={this.props.className} onClick={this.action}>
                    {
                        this.props.icon ?
                            <span><i className={this.props.icon}></i>&nbsp;</span> : ''
                    }
                    {this.props.label}
                </button>
                {
                    this.state.showRemoveMessage ?
                        <SweetAlert warning
                                    showCancel
                                    confirmBtnText="Yes, remove it!"
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title="Are you sure?"
                                    onConfirm={this.action}
                                    onCancel={this.cancel}
                        >
                            You will not be able to recover this protocol!
                        </SweetAlert> : ''
                }
                {
                    this.state.showSuccessMessage ?
                        <SweetAlert success title={this.props.messageTitle} onConfirm={this.actionExecutedWithSuccess}>
                            {this.props.message}
                        </SweetAlert>: ''
                }
            </div>
        );
    }

    static propTypes = {
        /**
         * Button icon
         * */
        icon: PropTypes.string,
        /**
         * Button label
         * */
        label: PropTypes.string.isRequired,
        /**
         * Message to display in the modal after the execution of the function
         * */
        message: PropTypes.string.isRequired,
        /**
         * Message title
         * */
        messageTitle: PropTypes.string.isRequired,
        /**
         * Button class name
         * */
        className: PropTypes.string,
        /**
         * Function to be executed when button is clicked
         * */
        action: PropTypes.func.isRequired,
        /**
         * Redirect after success
         * */
        redirect: PropTypes.string
    };
}

ButtonWithConfirmation.defaultProps = {
    icon: undefined,
    className: "",
    redirect: undefined
};

export default ButtonWithConfirmation;
