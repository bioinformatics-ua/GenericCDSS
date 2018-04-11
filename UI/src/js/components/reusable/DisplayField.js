import React, {Component} from 'react';

class DisplayField extends Component {
    render() {
        return (
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon input-group-infos">
                        <strong>{this.props.label}</strong>
                    </span>
                    {
                        this.props.readOnly ?
                            <input className="form-control enabled" readOnly value={this.props.value}/>
                            :
                            <input className="form-control" onChange={this.props.onChange} value={this.props.value}/>
                    }
                </div>
            </div>
        );
    }
}

export default DisplayField;







