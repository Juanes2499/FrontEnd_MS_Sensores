import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect, } from "react-router-dom";
import '../../App.css';
import {validateAuth} from '../../Shared/helper';
import Home from '../Containers/Home/Home';
import AdminDashboard from '../Containers/Administrador/Dashboard/Dashboard';

class Router extends Component {


  //El metodo de redireccionamiento. <Redirect from="/" to="/home" />

  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/Home" component={Home}/>
            <Route exact path="/Admintrator/Dashboard" component={validateAuth(AdminDashboard)}/>
            <Redirect to ="/Home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}
export default Router;
