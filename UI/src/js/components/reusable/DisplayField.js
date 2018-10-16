import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Input/output data component
 * */
class DisplayField extends Component {
    render() {
        let validation = this.props.isWarning ? "is-warning": this.props.isInvalid ? "is-invalid": "";
        let readOnly = typeof this.props.readOnly === "boolean" ? this.props.readOnly : this.props.readOnly();
        return (
            <div className={"displayField input-group " + this.props.className}>
                <div className="input-group-prepend">
                    <span className="input-group-text input-group-addon input-group-infos">
                        <strong>{this.props.label}</strong>
                    </span>
                </div>
                {
                    readOnly ?
                        <input className="displayField form-control enabled" readOnly value={this.props.value}/>
                        :
                        <input type={this.props.type}
                               data-keydata={this.props.keydata}
                               className={"displayField form-control " + validation}
                               onChange={this.props.onChange}
                               value={this.props.value}
                               min={this.props.min}
                               max={this.props.max}/>
                }
                {
                    this.props.isInvalid ?
                        <div className="invalid-feedback">
                            {this.props.invalidMessage}
                        </div> : ''
                }
                {
                    this.props.isWarning ?
                        <div className="warning-feedback">
                            {this.props.invalidMessage}
                        </div> : ''
                }
            </div>
        );
    }

    static propTypes = {
        /**
         * Label of the grey box
         * */
        label: PropTypes.string.isRequired,
        /**
         * Value to be shown
         * */
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        /**
         * Key data to help the input identification when data is changed
         * */
        keydata: PropTypes.string,
        /**
         * Function comming for the parent component to handle with the selecting change
         *
         * @param event
         * */
        onChange: PropTypes.func,
        /**
         * Boolean to block the display to only show data (as a normal input)
         * */
        readOnly: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.bool
        ]),
        /**
         * Input type
         * */
        type: PropTypes.string,
        /**
         * Input min when number
         * */
        min: PropTypes.string,
        /**
         * Input max when number
         * */
        max: PropTypes.string,
        /**
         * Class for the component in general
         * */
        className: PropTypes.string,
        /**
         * Message to show if the message is valid
         * */
        invalidMessage: PropTypes.string,
        /**
         * Boolean to trigger the invalid message
         * */
        isInvalid: PropTypes.bool,
        /**
         * Boolean to trigger the warning message
         * */
        isWarning: PropTypes.bool,
    };

}

DisplayField.defaultProps = {
    readOnly: false,
    type: "text",
    className: "",
    invalidMessage: "",
    isInvalid: false,
    isWarning: false
};

export default DisplayField;







