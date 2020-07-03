import React from 'react';
import Register from './component/Register';
import Login from './component/Login';
import Home from './component/Home';
import Snap from './component/Snap';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Register />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
        <Route exact path="/home">
        <Home />
        </Route>
                <Route exact path="/snap">
                    <Snap />
                </Route>
            </Switch>
        </Router>
    )
}


export default App