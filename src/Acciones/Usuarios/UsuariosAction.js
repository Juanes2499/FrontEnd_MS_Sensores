import Cookies from 'universal-cookie'
import { createAxiosInstance } from '../../Shared/helper';
import { useHistory } from 'react-router-dom';
import history from '../../Shared/createHistory';

const API_AUTH_HOST = window.API_AUTH_HOST

export const UsuariosAction_ConsultarUsuarios = () => {

    let dataUsuarios = {
        "seleccionar":"",
        "condicion":{
            
        },
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/usuarios/get'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, dataUsuarios)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const UsuariosAction_actualizarUsuarios = (data) => {
    console.log('entró a la acción: ', data)
}

export const UsuariosAction_FiltrarUsuarios = (data) => {

    
    let dataUsuarios = {
        "seleccionar":"",
        "condicion": data,
        "agrupar":"",
        "ordenar":""
    }
    
    const endpoint = '/api/usuarios/get'
    
    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, dataUsuarios)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const UsuariosAction_CrearUsuarios = (data) => {

    const endpoint = '/api/usuarios'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const UsuariosAction_EliminarUsuarios = (data) => {

    const endpoint = '/api/usuarios/delete'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}