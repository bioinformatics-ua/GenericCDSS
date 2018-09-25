import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import History from '../globalComponents/History.js';

/**
 * Button that show message after perform the defined action (confirmation is optional)
 * */
class ButtonWithMsg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirmationMessage: false,
            showSuccessMessage: false
        };
    }

    action = () => {
        if(this.props.confirmationMsg === undefined){
            this.props.action();
            this.setState({showSuccessMessage: true});
        }
        else
            this.setState({showConfirmationMessage: true});
    };

    actionAfterConfirmation = () => {
        this.props.action();
        this.setState({
            showSuccessMessage:true,
            showConfirmationMessage:false
        });
    };

    cancel = () => {
        this.setState({showConfirmationMessage:false});
    };

    actionExecutedWithSuccess = () => {
        this.setState({showSuccessMessage: false});
        if (this.props.redirect)
            History.push(this.props.redirect);
    };

    render() {
        return (
            <div>
                <div>
                    <button className={this.props.className} onClick={this.action}>
                        {
                            this.props.icon ?
                                <span><i className={this.props.icon}></i>&nbsp;</span> : ''
                        }
                        {this.props.label}
                    </button>
                </div>

                {
                    this.state.showConfirmationMessage ?
                        <SweetAlert warning
                                    showCancel
                                    confirmBtnText={this.props.confirmationMsgOkButton}
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title="Are you sure?"
                                    onConfirm={this.actionAfterConfirmation}
                                    onCancel={this.cancel}
                        >
                            {this.props.confirmationMsg}
                        </SweetAlert> : ''
                }

                {
                    this.state.showSuccessMessage ?
                        <SweetAlert success title={this.props.messageTitle} onConfirm={this.actionExecutedWithSuccess}>
                            {this.props.message}
                        </SweetAlert> : ''
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
        redirect: PropTypes.string,
        /**
         * Confirmation message before execute the action
         * */
        confirmationMsg: PropTypes.string,
        /**
         * Confirmation button label
         * */
        confirmationMsgOkButton: PropTypes.string
    };
}

ButtonWithMsg.defaultProps = {
    icon: undefined,
    className: "",
    redirect: undefined,
    confirmationMsg: undefined,
    confirmationMsgOkButton: "Yes, remove it!"
};

export default ButtonWithMsg;
