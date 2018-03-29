import React, {Component} from 'react';

export default class httpError extends Component {
    render() {
        return (
            <div className="text-center">
                <h1>500 - Service Error</h1>
                <p>Oops, we appear to be having problems. Please contact the administrator.</p>
            </div>
        )
    }
}