import { createAxiosInstance } from '../../Shared/helper';
import history from '../../Shared/createHistory';

export const DispositivosAction_ConsultarDispositivos = (json) => {

    let data = {
        "microservicio_interes":"GLOBAL",
        "modulo_interes":"GLOBAL",
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/dispositivos/get'

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

export const DispositivosAction_ConsultarMicrosevicios = () => {

    let data = {
        "microservicio_interes":"GLOBAL",
        "modulo_interes":"GLOBAL",
        "seleccionar":"DISTINCT NOMBRE_MICROSERVICIO AS value, ALIAS_MICROSERIVICIO AS label",
        "condicion":{},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/dispositivos/microservicios/get'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    console.log(err.response)
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const DispositivosAction_CrearDispositivos = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

    const endpoint = '/api/dispositivos'

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
