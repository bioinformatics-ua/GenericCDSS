import React from 'react';
import Reflux from 'reflux';
import DisplayField from '../reusable/DisplayField.js';

class InquiryElement extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    
    render() {
        return (
            <div>
                <DisplayField readOnly={true} onChange={this.handleChange} label={"Type"}
                                              keydata={"last_name"} value={"Simple"}/>
            </div>
        );
    }
}

export default InquiryElement;