import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect, } from "react-router-dom";
//import '../../App.css';
import {validateAuth} from '../../Shared/helper';
import Home from '../Containers/Home/Home';
import Administrator from '../Containers/Administrador/Administrator/Administrator';
import Usuarios from '../Containers/Administrador/Usuarios/Usuarios';
class Router extends Component {


  //El metodo de redireccionamiento. <Redirect from="/" to="/home" />

  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/Home" component={Home}/>
            <Route exact path="/Administrator" component={validateAuth(Administrator)}/>
            <Route exact path="/Administrator/Authentication/Usuarios" component={validateAuth(Usuarios)}/>
            <Redirect to ="/Home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}
export default Router;
