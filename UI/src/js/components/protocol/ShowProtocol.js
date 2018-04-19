import React from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';

class ShowProtocol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = {
            protocolID: this.props.match.params.object
        };
    }

    componentDidMount() {
        ProtocolActions.loadProtocol(this.state.protocolID);
    }

    render() {
        return (
            <div className="ShowProtocol">
                <h2>Protocolo: {this.state.protocol.title}</h2>
                Mostrar o protocolo (todos os elementos)
            </div>
        );
    }
}

export default ShowProtocol;