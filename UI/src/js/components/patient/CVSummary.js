import React from 'react';
import Reflux from 'reflux';
import {ClinicalVariablesStore, ClinicalVariablesActions} from '../../reflux/ClinicalVariablesReflux.js';
import CVRepresentationGroup from './CVRepresentationGroup.js';

class CVSummary extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ClinicalVariablesStore;
        this.buildDataComponents = this.buildDataComponents.bind(this);
    }

    buildDataComponents() {
        let listOfComponents = [];
        const receivedList = this.state.summary;

        for (let index = 0; index < receivedList.length; index++)
            listOfComponents.push(<CVRepresentationGroup key={index} title={receivedList[index]["component_title"]}
                                                         content={receivedList[index]["content"]}/>);

        return listOfComponents;
    }

    componentDidMount() {
        ClinicalVariablesActions.load(this.props.patientID);
    }

    render() {
        console.log(this.props.patientID)
        if (this.state.summary !== undefined) { //Stupid fix, needs to be changed
            let listOfComponents = this.buildDataComponents();
            return (
                <div className="CVSummary">
                    {listOfComponents}

                    <div className="pull-right btn-group" role="group">
                        <button type="button" className="btn btn-default">Mostrar protocols atribuidos</button>
                        <button type="button" className="btn btn-default">Dar alta</button>
                        <button type="button" className="btn btn-default">Introduzir medições</button>
                    </div>
                </div>
            );
        }
        else
            return (<div className="CVSummary"></div>);
    }
}

export default CVSummary;
