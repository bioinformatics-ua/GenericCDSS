import React, {Component} from 'react';

class DisplayField extends Component {
    render() {
        return (
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon input-group-infos">
                        <strong>{this.props.label}</strong>
                    </span>
                    <input className="form-control enabled" readOnly
                           value={this.props.value}/>
                </div>
            </div>
        );
    }
}

export default DisplayField;







