import React, {Component} from 'react';

class ProtocolElement extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
             value:"185"
        };
    }

    handleSubmit(event) {
        this.props.next(this.props.options, this.props.componentPosition);
    }

    render() {
        return (
            <div class="card">
                <form class="card-body" >
                    <div class="form-group">
                        <label for="exampleInputEmail1">{this.props.label}</label>
                        <div className="form-check">
                            <div className="btn-group btn-group-toggle btn-group-justified" data-toggle="buttons">
                                {/*
                                <label class="btn btn-secondary" onClick={() => this.handleSubmit()} >
                                    <input className="form-control enabled" value={this.state.value}/>
                                </label>*/}

                                <div className="input-group">
                                    <input className="form-control enabled" value={this.state.value}/>
                                    <span className="input-group-addon btn-success btn-100" onClick={() => this.handleSubmit()}>
                                        <strong>Done</strong>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


export default ProtocolElement;
