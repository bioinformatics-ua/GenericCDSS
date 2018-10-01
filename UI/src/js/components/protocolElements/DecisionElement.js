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
            value: "",

            conditionOptions: [
                //{value: 'switch', label: 'switch'}, todo
                {value: '<', label: '<'},
                {value: '>', label: '>'},
                {value: '=', label: '=='}
            ]
        };
    }

    componentDidMount() {
        ClinicalVariablesActions.loadCVHeaders();
        this.loadingDetails();
    }

    loadingDetails = () => {
        if(this.props.mode === "edit"){
            let selectedCV = undefined;
            if(this.props.elementData.clinicalVariable){
                selectedCV = this.state.headers.find(obj => {
                    return obj.value === this.props.elementData.clinicalVariable.variable;
                });
                this.props.addElementConfigurations("clinicalVariable", {variable: selectedCV.value});
            }
            else
                this.props.addElementConfigurations("clinicalVariable", {variable: selectedCV});

            let condition = undefined;
            let value = undefined;
            if (this.props.elementData.condition) {
                condition = this.state.conditionOptions.find(obj => {
                    return obj.value === this.props.elementData.condition.charAt(0);
                });
                condition = condition.value;
                value = this.props.elementData.condition.substring(1);
                this.props.addElementConfigurations("condition", this.props.elementData.condition);
            }

            let nextElementIdFalse = "";
            let nextElementIdTrue = "";
            if(this.props.elementData.nextElement){
                nextElementIdFalse = this.props.elementData.nextElement.split(";")[0].split(":")[1];
                nextElementIdTrue = this.props.elementData.nextElement.split(";")[1].split(":")[1];

                this.props.addElementConfigurations("nextElement", this.props.elementData.nextElement);
            }
            this.setState({
                cv:selectedCV,
                condition: condition,
                value: value,
                nextElementIdTrue: nextElementIdTrue,
                nextElementIdFalse: nextElementIdFalse
            })
        }
    };

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
        return (
            <div>
                <DisplayOptionsField label={"Clinical variable"}
                                     options={this.state.headers}
                                     onChange={this.cvSelectHandleChange}
                                     selection={this.state.cv}
                                     selectClassName={"Selectx2"}
                                     className={"mb-3"}/>
                <DisplayOptionsField label={"Condition"}
                                     options={this.state.conditionOptions}
                                     onChange={this.conditionHandleChange}
                                     selection={this.state.condition}
                                     className={"mb-3"}/>
                <DisplayField label={"Value"}
                              onChange={this.valueInConditionHandleChange}
                              value={this.state.value}
                              className={"mb-3"}/>
                <DisplayField label={"Next element - True"}
                              onChange={this.nextElementIdWhenTrueHandleChange}
                              value={this.state.nextElementIdTrue}
                              type={"number"}
                              min={"0"}
                              className={"mb-3"}/>
                <DisplayField label={"Next element - False"}
                              onChange={this.nextElementIdWhenFalseHandleChange}
                              value={this.state.nextElementIdFalse}
                              type={"number"}
                              min={"0"}
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
        addElementConfigurations: PropTypes.func
    };
}

DecisionElement.defaultProps = {
    elementID: 1
};

export default DecisionElement;