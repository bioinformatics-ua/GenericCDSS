import React, {Component} from 'react';
import DisplayField from '../reusable/DisplayField.js';


class CVRepresentationGroup extends Component {
    constructor(props) {
        super(props);
        this.buildDisplayComponents = this.buildDisplayComponents.bind(this);
    }

    buildDisplayComponents() {
        let listOfComponents = [];
        const receivedObject = this.props.content;
        let index = 0;

        for (var key in receivedObject) {
            listOfComponents.push(<DisplayField key={index} label={key} value={receivedObject[key]}/>);
            index++;
        }

        return listOfComponents;
    }

    render() {
        let listOfDisplayFields = this.buildDisplayComponents();
        return (
            <div className="panel panel-default panel-body CVRepresentationGroup">
                <h4>{this.props.title}</h4>
                {listOfDisplayFields}
            </div>
        );
    }
}

export default CVRepresentationGroup;
