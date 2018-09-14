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

    actionHandleChange  = (event) => {
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
                              value={this.state.action}/>
                <DisplayField label={"Next element"}
                              onChange={this.nextElementIdHandleChange}
                              value={this.state.nextElementId}
                              type={"number"}
                              min={"0"}/>
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
        addElementConfigurations: PropTypes.func
    };
}

ActionElement.defaultProps = {
    elementID: 1
};

export default ActionElement;