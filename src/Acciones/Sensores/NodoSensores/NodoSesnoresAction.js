import { createAxiosInstance } from '../../../Shared/helper';
import history from '../../../Shared/createHistory';

export const NodosSensoresAction_ConsultarDispositivos = (json) => {

    let data = {
        "microservicio_interes": window.MICROSERVICIO_INTERES,
        "modulo_interes": window.MODULO_ITERES,
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
                    console.log(err.response)
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_ConsultarMicrosevicios = () => {

    let data = {
        "microservicio_interes":  window.MICROSERVICIO_INTERES,
        "modulo_interes": window.MODULO_ITERES,
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
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_CrearDispositivos = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

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

export const NodosSensoresAction_ActualizarDispositivos = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().put(endpoint, data)
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

export const NodosSensoresAction_EliminarDispositivos = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/delete'

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

export const NodosSensoresAction_EstadoContrasenaDispositivo = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/validarEstadoContrasena'

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

export const NodosSensoresAction_SolicitarCambioContrasena = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/solicitarCambioContrasena'

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

export const NodosSensoresAction_CambiarContrasenaDispositivo = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/actualizarContrasena'

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

export const NodosSensoresAction_CambiarTokenDispositivo = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/actualizarTokenDispositivo'

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