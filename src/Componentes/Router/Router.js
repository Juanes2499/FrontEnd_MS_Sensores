import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect, } from "react-router-dom";
import {validateAuth} from '../../Shared/helper';
import Home from '../Containers/Home/Home';
import Administrator from '../Containers/Administrador/Administrator/Administrator';
import Usuarios from '../Containers/Administrador/Usuarios/Usuarios';
import Microservicios from '../Containers/Administrador/Microservicios/Microservicios';
import Modulos from '../Containers/Administrador/Modulos/Modulos';
import Roles from '../Containers/Administrador/Roles/Roles';
import ConfiguracionMicroserviciosModulos from '../Containers/Administrador/ConfiguracionMicroserviciosModulos/ConfiguracionMicroserviciosModulos';
import ConfiguracionUsuarios from '../Containers/Administrador/ConfiguracionUsuarios/ConfiguracionUsuarios';
import NodoSensores from '../Containers/Administrador/Sensores/NodoSensores/NodoSensores';
import VariablesNodoSensor from '../Containers/Administrador/Sensores/VariablesNodoSensor/VariablesNodoSensor';
import ConfiguracionVariablesNodo from '../Containers/Administrador/Sensores/ConfiguracionVariablesNodo/ConfiguracionVariablesNodo';
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
            <Route exact path="/Administrator/Authentication/Microservicios" component={validateAuth(Microservicios)}/>
            <Route exact path="/Administrator/Authentication/Modulos" component={validateAuth(Modulos)}/>
            <Route exact path="/Administrator/Authentication/Roles" component={validateAuth(Roles)}/>
            <Route exact path="/Administrator/Authentication/ConfiguracionMSM" component={validateAuth(ConfiguracionMicroserviciosModulos)}/>
            <Route exact path="/Administrator/Authentication/ConfiguracionUsuarios" component={validateAuth(ConfiguracionUsuarios)}/>
            <Route exact path="/Administrator/Sensores/NodoSensores" component={validateAuth(NodoSensores)}/>
            <Route exact path="/Administrator/Sensores/VariablesNodoSensor" component={validateAuth(VariablesNodoSensor)}/>
            <Route exact path="/Administrator/Sensores/ConfiguracionVNS" component={validateAuth(ConfiguracionVariablesNodo)}/>
            <Redirect to ="/Home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}
export default Router;
