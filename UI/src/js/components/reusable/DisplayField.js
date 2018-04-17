import React, {Component} from 'react';

class DisplayField extends Component {
    render() {
        let readOnly = this.props.readOnly === undefined ? true: this.props.readOnly;

        return (
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon input-group-infos">
                        <strong>{this.props.label}</strong>
                    </span>
                    {
                         readOnly ?
                            <input className="form-control enabled" readOnly value={this.props.value}/>
                            :
                            <input data-keydata={this.props.keydata} className="form-control" onChange={this.props.onChange} value={this.props.value}/>
                    }
                </div>
            </div>
        );
    }
}

export default DisplayField;







