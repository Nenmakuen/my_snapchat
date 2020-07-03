import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
        };
    }

    async UNSAFE_componentWillMount() {
        var token = await localStorage.getItem("userid")
        if (token)
            window.location = '/home';
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onFocusChange = () => {
        this.setState({isFocused: true});
    }

    onSubmit(e) {
        e.preventDefault();

        const membre = {
            password: this.state.password,
            email: this.state.email,
        }

        axios.post('http://snapi.epitech.eu/inscription', membre, {header: "Content-Type: application/json"})
            .then((res) => {
                console.log("L'inscription a bien fonctionné : " + res.data.data.email)
                window.location = '/login';
            })
            .catch((err) => {
                console.log(err)
            })

        this.setState({
            password: '',
            email: '',
        })
    }

    render(){

        return (
<div>
            <h1>
            NARQUELION
            </h1>
    <div className="title">Inscription</div>
            <form onSubmit={this.onSubmit} className="form_inscrip">
                <div className="form-group">
        <input type="email"
        required
               placeholder="Email"
        className="form-control"
        value={this.state.email}
        onChange={this.onChangeEmail}
        />
        </div>
        <div className="form-group">
        <input type="password"
        required
        className="form-control"
               placeholder="Mot de passe"
        value={this.state.password}
        onChange={this.onChangePassword}
        />
        </div>
        <div className="form-group">
            <input type="submit" value="S'inscrire" className="button"/>
            </div>
                <Link class="change" to='/login'>Déjà un compte ?</Link>
            </form>


        </div>
        )
    }
}