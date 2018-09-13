import React from 'react';
import Reflux from 'reflux';
import DisplayField from '../reusable/DisplayField.js';

class ActionElement extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <p>
                todo
            </p>
        );
    }
}

export default ActionElement;