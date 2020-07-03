import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.deco = this.deco.bind(this);
      this.state = {
        data: [],
      };
    }
    componentDidMount() {
      var token = localStorage.getItem("userid")
      if (!token) this.props.navigation.replace("Login")
      axios.get('http://snapi.epitech.eu/snaps', { headers: { token: token } })
        .then((response) => {
          this.setState({ data: response.data.data })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    async deco() {
      await localStorage.removeItem("userid")
      window.location = "/login";
    }
    async home() {
      window.location = "/home";
    } 
    render() {

      return (
        <div>
          <h1>NARQUELION</h1>
          <div className="form-deco" >
            <input onClick={this.deco} value="Se déconnecter" className="deco" />
          </div>
          <div className="form-snap">
            <input onClick={this.home} value='Accueil' className="snap" />
          </div>
          <div className="title">Vos snaps reçus:</div>
          <div className="bloc">
            {this.state.data.map((item) =>
              <div className="ligne">{item.from}</div>
            )}
          </div>
        </div>
      )
    }
}