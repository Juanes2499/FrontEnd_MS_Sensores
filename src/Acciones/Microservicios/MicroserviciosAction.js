import { createAxiosInstance } from '../../Shared/helper';
import history from '../../Shared/createHistory';

export const MicroserviciosAction_ConsultarMicroservicios = () => {

    let data = {
        "seleccionar":"",
        "condicion":{
            
        },
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/microservicios/get'

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