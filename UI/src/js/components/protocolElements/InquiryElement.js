import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {ClinicalVariablesStore} from '../../reflux/ClinicalVariablesReflux.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
import DisplayField from '../reusable/DisplayField.js';

class InquiryElement extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ClinicalVariablesStore;
        this.state = {
            nextElementId: "", //(this.props.elementID + 1).toString(),
            cv: undefined,
            validated: false
        };
    }

    componentDidMount() {
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

            this.props.addElementConfigurations("nextElement", this.props.elementData.nextElement);
            this.setState({
                cv:selectedCV,
                nextElementId:this.props.elementData.nextElement
            })
        }
    };

    isValid = () => {
        this.setState({validated: true});
        return (this.state.cv !== undefined && (this.state.nextElementId === "" || this.state.nextElementId > this.props.elementID));
    };

    cvSelectHandleChange = (selection) => {
        this.props.addElementConfigurations("clinicalVariable", {variable: selection.value});
        this.setState({cv: selection.value});
    };

    nextElementIdHandleChange = (event) => {
        event.preventDefault();
        this.props.addElementConfigurations("nextElement", event.target.value);
        this.setState({nextElementId: event.target.value});
    };


    render() {
        return (
            <div>
                <DisplayOptionsField label={"Clinical variable"}
                                     options={this.state.headers}
                                     onChange={this.cvSelectHandleChange}
                                     selection={this.state.cv}
                                     className={"mb-3"}
                                     isInvalid={this.state.cv === undefined && this.state.validated}
                                     invalidMessage={"A clinical variable must be selected"}/>
                <DisplayField label={"Next element"}
                              onChange={this.nextElementIdHandleChange}
                              value={this.state.nextElementId}
                              type={"number"}
                              min={(parseInt(this.props.elementID, 10) + 1).toString()}
                              className={"mb-3"}
                              isInvalid={this.state.nextElementId !== "" && this.state.nextElementId <= this.props.elementID && this.state.validated}
                              invalidMessage={"The next element id should be bigger than the element id"}/>
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

InquiryElement.defaultProps = {
    elementID: 1
};

export default InquiryElement;