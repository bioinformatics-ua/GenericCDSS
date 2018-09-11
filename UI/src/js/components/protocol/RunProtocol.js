import React, { Component } from 'react';
import ProtocolElement from './ProtocolElement.js';
import ProtocolRadioElement from './ProtocolRadioElement.js';
import PatientInfo from '../patient/PatientInfo.js';

class RunProtocol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastComponent: 1,
            atualComponent: 1,
            items: []
        };
    }

    search = (nameKey, myArray) => {
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].componentId === nameKey) {
                return myArray[i];
            }
        }
    };

    setAtualComponent = (componentId, componentPosition) => {
        this.setState({
            atualComponent: componentId,
            lastComponent:componentPosition
        });
    };

    addComponentToItems = (component, items, position) => {
        switch(component.type)
        {
            case "choice": items.push(<ProtocolRadioElement componentPosition={position} label={component.label} options={component.options} next={this.setAtualComponent}/>); break;
            case "action": items.push(<ProtocolElement componentPosition={position}  label={component.label} options={component.next} next={this.setAtualComponent}/>); break;
            default: break;
        }
    };

    render() {
        let params = this.props.match.params;
        console.log(this.props)
        console.log(params)

        let composition = [{
            componentId: 1,
            label: "Do the patient take anti-diabetics?",
            type: "choice",
            options: [{option: "Yes", next: 2},{option: "No", next: 3}]
        }, {
            componentId: 2,
            label: "Please insert the blood glucose levels",
            type: "action",
            next: 3
        },{
            componentId: 3,
            label: "Do the patient take insulin home?",
            type: "choice",
            options: [{option: "Yes", next: 2},{option: "No", next: 3}]
        }];

        let items = [];
        let stateItems = [];
        for (let index = 0; index < this.state.items.length; index++)
        {
            let component = this.search(this.state.items[index].componentId, composition);
            this.addComponentToItems(component, items, this.state.items[index].componentPositionInArray);
            stateItems.push({componentId: component.componentId, componentPositionInArray:this.state.items[index].componentPositionInArray});

            if(this.state.items[index].componentPositionInArray === this.state.lastComponent)
                break;
        }

        if(this.state.atualComponent !== 0){
            let component = this.search(this.state.atualComponent, composition);
            this.addComponentToItems(component, items, this.state.items.length+1);

            stateItems.push({componentId: component.componentId, componentPositionInArray:this.state.items.length+1});

            this.setState({
                atualComponent: 0,
                items: stateItems,
                lastComponent: this.state.items.length+1
            });
        }
        return (
            <div className="Protocol">
                <PatientInfo patientID={params.patient} />
                <div className="ProtocolExecution">{items}</div>
            </div>
        );
    }
}
export default RunProtocol;