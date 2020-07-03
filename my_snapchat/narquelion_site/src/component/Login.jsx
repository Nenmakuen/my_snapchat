import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    async UNSAFE_componentWillMount() {
        var token = await localStorage.getItem("userid")
        if (token)
            window.location = '/home';
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const membre = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://snapi.epitech.eu/connection', membre, {header: "Content-Type: application/json"})
            .then((res) => {
                console.log("Tu es bien co : " + res.data.data.token)
                localStorage.setItem("userid", res.data.data.token);
                window.location = "/home";
            })
            .catch((err) => {
                console.log(err)
            })


        this.setState({
            email: '',
            password: '',
        })
    }

    render () {

        return (
    <div>
            <h1>
            NARQUELION
            </h1>
    <div className="title">Connexion</div>
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
            <input type="submit" value="Se connecter" className="button"/>
            </div>
                <Link className="change" to='/register'>Pas de compte ?</Link>
            </form>


        </div>
        )
    }
}