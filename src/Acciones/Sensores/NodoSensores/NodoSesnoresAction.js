import { createAxiosInstanceSensores } from '../../../Shared/helper';
import history from '../../../Shared/createHistory';

export const NodoSensoresAction_ConsultarNodos = (json) => {

    let data = {
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/nodoSensor/get'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().post(endpoint, data)
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

export const NodoSensoresAction_CrearNodo = (data) => {

    const endpoint = '/api/nodoSensor'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().post(endpoint, data)
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

export const NodoSensoresAction_ActualizarNodo = (data) => {

    const endpoint = '/api/nodoSensor'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().put(endpoint, data)
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

export const NodoSensoresAction_EliminarNodo = (data) => {

    const endpoint = '/api/nodoSensor/delete'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().post(endpoint, data)
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