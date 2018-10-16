import React from 'react';
import DisplayField from "../reusable/DisplayField";
import Reflux from "reflux";
import {UserStore} from "../../reflux/UserReflux";
import $ from "jquery";

class Profile extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = UserStore;
        this.state = {
            validated: false,
            user:{
                password: "",
                confirmPassword: ""
            }
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_Data = this.state.user;
        new_Data[key] = event.target.value;
        this.setState({user: new_Data});
    };

    isValid = () => {
        return this.state.user["email"] !== "" &&
            this.state.user["first_name"] !== "" &&
            this.state.user["last_name"] !== "" &&
            this.state.user["password"] !== undefined &&
            this.state.user["confirmPassword"] !== undefined &&
            this.state.user["password"] === this.state.user["confirmPassword"];
    };

    save = () => {
        this.setState({validated: true});
        if(this.isValid()){
            console.log("save profile")
            console.log(this.state)
            //todo send to the server the data
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <h2><i className="fa fa-user"></i>&nbsp;Edit profile</h2>
                    <div className="card card-body PatientInfo mb-3">
                        <div className="col-md-12">
                            <div className="row mb-3">
                                <DisplayField readOnly={true}
                                              onChange={this.handleChange}
                                              label={"Email"}
                                              keydata={"email"}
                                              value={this.state.user["email"]}
                                              isInvalid={this.state.user["email"] === "" && this.state.validated}
                                              invalidMessage={"The email field is empty"}/>
                            </div>
                            <div className="row mb-3">
                                <DisplayField onChange={this.handleChange}
                                              label={"First Name"}
                                              keydata={"first_name"}
                                              value={this.state.user["first_name"]}
                                              isInvalid={this.state.user["first_name"] === "" && this.state.validated}
                                              invalidMessage={"The first name field is empty"}/>
                            </div>
                            <div className="row mb-3">
                                <DisplayField onChange={this.handleChange}
                                              label={"Last Name"}
                                              keydata={"last_name"}
                                              value={this.state.user["last_name"]}
                                              isInvalid={this.state.user["last_name"] === "" && this.state.validated}
                                              invalidMessage={"The last name field is empty"}/>
                            </div>
                            <div className="row mb-3">
                                <DisplayField onChange={this.handleChange}
                                              label={"Password"}
                                              keydata={"password"}
                                              value={this.state.user["password"]}
                                              type={"password"}
                                              isInvalid={(this.state.user["password"] === undefined || this.state.user["password"] !== this.state.user["confirmPassword"]) && this.state.validated}
                                              invalidMessage={"The password doesn't match or are empty"}/>
                            </div>
                            <div className="row mb-3">
                                <DisplayField onChange={this.handleChange}
                                              label={"Confirm password"}
                                              keydata={"confirmPassword"}
                                              value={this.state.user["confirmPassword"]}
                                              type={"password"}
                                              isInvalid={(this.state.user["confirmPassword"] === undefined || this.state.user["password"] !== this.state.user["confirmPassword"]) && this.state.validated}
                                              invalidMessage={"The password doesn't match or are empty"}/>
                            </div>
                            <div className="row mb-3 pull-right">
                                <button className="btn btn-sm btn-primary btn-150" onClick={this.save}>
                                    <i className="fa fa-save"></i>&nbsp;Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

export default Profile;