import React from 'react';
import Reflux from 'reflux';
import {ClinicalVariablesStore, ClinicalVariablesActions} from '../../reflux/ClinicalVariablesReflux.js';
import CVRepresentationGroup from './CVRepresentationGroup.js';

class ClinicalVariables extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ClinicalVariablesStore;
        this.buildDataComponents = this.buildDataComponents.bind(this);
    }

    buildDataComponents(){
        let listOfComponents = [];
        const receivedList = this.state.data;

        for(let index = 0; index < receivedList.length; index++)
            listOfComponents.push(<CVRepresentationGroup key={index} title={receivedList[index]["component_title"]} content={receivedList[index]["content"]}/>);

        return listOfComponents;
    }

    componentDidMount() {
        ClinicalVariablesActions.load(this.props.patientID);
    }

    render() {
        if (this.state.data !== undefined) { //Stupid fix, needs to be changed
            let listOfComponents = this.buildDataComponents();
            return (<div>{listOfComponents}</div>);
        }
        else
            return (<div className="panel panel-default panel-body ClinicalVariables"></div>);
    }
}

export default ClinicalVariables;
