import React from 'react';
import Reflux from 'reflux';
import Select from 'react-select';
import "react-table/react-table.css";
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';

class ProtocolCostumization extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = [];
    }

    componentDidMount() {
        ProtocolActions.load();
    }

    selectHandleChange = (selectedProtocol) => {
        this.setState({selectedProtocol});
        this.props.setProtocol({selectedProtocol});
    };

    render() {
        return (
            <div className="Content">
                <Select
                    placeholder="Selecionar que protocolo atribuir ao paciente"
                    className="Select"
                    name="form-field-name"
                    value={this.state.selectedProtocol}
                    onChange={this.selectHandleChange}
                    options={this.state.protocolListKeyValue}
                />
                {/*later i can insert new things about the protocol here (costumization for the patient)*/}
            </div>
        );
    }
}

export default ProtocolCostumization;
