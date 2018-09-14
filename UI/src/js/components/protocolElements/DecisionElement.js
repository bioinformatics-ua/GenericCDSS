import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {ClinicalVariablesStore, ClinicalVariablesActions} from '../../reflux/ClinicalVariablesReflux.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
import DisplayField from '../reusable/DisplayField.js';

class DecisionElement extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ClinicalVariablesStore;
        this.state = {
            nextElementIdTrue: "",//(this.props.elementID + 1).toString(),
            nextElementIdFalse: "",//(this.props.elementID + 2).toString(),
            cv: undefined,
            condition: undefined,
            value: ""
        };
    }

    componentDidMount() {
        ClinicalVariablesActions.loadCVHeaders();
    }

    cvSelectHandleChange = (selection) => {
        this.props.addElementConfigurations("clinicalVariable", {variable: selection.value});
        this.setState({cv: selection.value});
    };

    conditionHandleChange = (selection) => {
        this.setState({condition: selection.value});
    };

    nextElementIdWhenTrueHandleChange = (event) => {
        event.preventDefault();
        let nextElement = "False:" + this.state.nextElementIdFalse + ";True:" + event.target.value;
        this.props.addElementConfigurations("nextElement", nextElement);
        this.setState({nextElementIdTrue: event.target.value});
    };

    nextElementIdWhenFalseHandleChange = (event) => {
        event.preventDefault();
        let nextElement = "False:" + event.target.value + ";True:" + this.state.nextElementIdTrue;
        this.props.addElementConfigurations("nextElement", nextElement);
        this.setState({nextElementIdFalse: event.target.value});
    };

    valueInConditionHandleChange = (event) => {
        event.preventDefault();
        let condition = this.state.condition + event.target.value;
        this.props.addElementConfigurations("condition", condition);
        this.setState({value: event.target.value});
    };

    render() {
        const conditionOptions = [
            //{value: 'switch', label: 'switch'}, todo
            {value: '<', label: '<'},
            {value: '>', label: '>'},
            {value: '=', label: '=='}
        ];

        return (
            <div>
                <DisplayOptionsField label={"Clinical variable"}
                                     options={this.state.headers}
                                     onChange={this.cvSelectHandleChange}
                                     className={"Selectx2"}/>
                <DisplayOptionsField label={"Condition"}
                                     options={conditionOptions}
                                     onChange={this.conditionHandleChange}/>
                <DisplayField label={"Value"}
                              onChange={this.valueInConditionHandleChange}
                              value={this.state.value}/>
                <DisplayField label={"Next element - True"}
                              onChange={this.nextElementIdWhenTrueHandleChange}
                              value={this.state.nextElementIdTrue}
                              type={"number"}
                              min={"0"}/>
                <DisplayField label={"Next element - False"}
                              onChange={this.nextElementIdWhenFalseHandleChange}
                              value={this.state.nextElementIdFalse}
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

DecisionElement.defaultProps = {
    elementID: 1
};

export default DecisionElement;