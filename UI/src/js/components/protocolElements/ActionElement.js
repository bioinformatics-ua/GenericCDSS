import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import DisplayField from '../reusable/DisplayField.js';

class ActionElement extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextElementId: "",//(this.props.elementID + 1).toString(),
            action: ""
        };
    }

    componentDidMount() {
        this.loadingDetails();
    }

    loadingDetails = () => {
        if(this.props.mode === "edit"){
            this.props.addElementConfigurations("action", this.props.elementData.action);
            this.props.addElementConfigurations("nextElement", this.props.elementData.nextElement);
            this.setState({
                action: this.props.elementData.action,
                nextElementId: this.props.elementData.nextElement
            })
        }
    };

    isValid = () => {
        this.setState({validated: true});
        return (this.state.action !== "");
    };

    actionHandleChange = (event) => {
        event.preventDefault();
        this.props.addElementConfigurations("action", event.target.value);
        this.setState({action: event.target.value});
    };

    nextElementIdHandleChange = (event) => {
        event.preventDefault();
        this.props.addElementConfigurations("nextElement", event.target.value);
        this.setState({nextElementId: event.target.value});
    };

    render() {
        return (
            <div>
                <DisplayField label={"Action"}
                              onChange={this.actionHandleChange}
                              value={this.state.action}
                              className={"mb-3"}
                              isInvalid={this.state.action === "" && this.state.validated}
                              invalidMessage={"A action must be inserted"}/>
                <DisplayField label={"Next element"}
                              onChange={this.nextElementIdHandleChange}
                              value={this.state.nextElementId}
                              type={"number"}
                              min={(parseInt(this.props.elementID, 10) + 1).toString()}
                              className={"mb-3"}/>
            </div>
        );
    }

    static propTypes = {
        /**
         * Next element id
         * */
        nextElementId: PropTypes.number,
        /**
         * Send the protocol configurations to the parent
         *
         * @param key
         * @param value
         * */
        addElementConfigurations: PropTypes.func,
        /**
         * Object with the element data (important in the edition mode)
         * */
        elementData: PropTypes.object
    };
}

ActionElement.defaultProps = {
    elementID: 1
};

export default ActionElement;