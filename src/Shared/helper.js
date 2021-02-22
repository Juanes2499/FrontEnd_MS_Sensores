import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import {LoginAction_CerrarSesion} from '../Acciones/Login/LoginAction';
import history from './createHistory';

const API_AUTH_HOST = window.API_AUTH_HOST;
const TOKEN_KEY = window.TOKEN_KEY;
const cookies = new Cookies();

export const  createAxiosInstance = (config) => {
    const token = cookies.get('token')
    if (!token) return null
    let minConfig = {
        baseURL: API_AUTH_HOST,
        headers: { 'Authorization': `Bearer ${token}`}
    }
    if (config) {
        minConfig = { ...minConfig, ...config }
    }

    return axios.create(minConfig)
}

export const validateAuth =  (ComposedComponent) => {      
    class Authorise extends Component {
    
        componentWillMount() {
            this.validarToken(this.props);
        }

        componentWillUpdate(nextProps) {
            this.validarToken(nextProps);

        }

        validarToken = (props) => {

            const { history} = props;

            const token = cookies.get('token');

            jwt.verify(token, TOKEN_KEY, (err, decoded) => {      
                if (err) {
                    LoginAction_CerrarSesion();
                    history.push('/Home')
                }
            })
            
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return withRouter(Authorise);
}

export const validarToken = (token) => {

    jwt.verify(token, TOKEN_KEY, (err, decoded) => {      
        if (err) {
            return false;
        }
    })

    return true;
}

export const decodeToken = (token, result) => {

    jwt.verify(token, TOKEN_KEY, (err, decoded) => {      
        if (err) {
            cookies.remove('token', { path: '/' });
            history.push('/Home');
        }
        
        return result(decoded)
    })
}

