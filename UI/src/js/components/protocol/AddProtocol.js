import React from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';

class AddProtocol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="AddProtocol">
                <h2>Insert protocol</h2>

            </div>
        );
    }
}

export default AddProtocol;