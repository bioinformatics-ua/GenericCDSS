import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import History from '../globalComponents/History.js';

/**
 * Button that show message after perform the defined action
 * */
class ButtonWithMsg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccessMessage: false
        };
    }

    action = () => {
        this.props.action();
        this.setState({
            showSuccessMessage: true
        });
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
        redirect: PropTypes.string
    };
}

ButtonWithMsg.defaultProps = {
    icon: undefined,
    className: "",
    redirect: undefined
};

export default ButtonWithMsg;

