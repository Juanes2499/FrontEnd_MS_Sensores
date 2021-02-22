import Cookies from 'universal-cookie'
import { createAxiosInstance, decodeToken } from '../../Shared/helper';

const cookies = new Cookies();

export const SidebarAction_ConsultarMenu = () => {

    const token = cookies.get('token');
    let decodificado = {};

    decodeToken(token, (res) => {
        decodificado['PERMISOS'] = res.PERMISOS;
    })
    
    var permisosKeys = Object.keys(decodificado.PERMISOS).sort();
    let permisosArray = []
    var permisosAsignadoKeys = [];
    permisosKeys.forEach(x => {
        permisosArray.push(`'${x.replace("MS_","")}'`);
        permisosAsignadoKeys.push(Object.keys(decodificado.PERMISOS[x]).sort());
    })

    let permisosAsignadosArray = [];

    permisosAsignadoKeys.forEach(x => {
        x.forEach(j => {
            permisosAsignadosArray.push(`'${j.replace("MOD_","")}'`);
        })
    })
    
    let dataMicroservicios = {
        "seleccionar":"NOMBRE_MICROSERVICIO, ALIAS_MICROSERIVICIO, ICON_MICROSERVICIO, ORDEN",
        "condicion":{
            "NOMBRE_MICROSERVICIO": {
                "conector_logico":"",
                "operador": "IN",
                "valor_condicion": `${permisosArray.toString()}`
            }
        },
        "agrupar":"",
        "ordenar":""
    }

    let dataConfiguracionMSM = {
        "seleccionar":"NOMBRE_MICROSERVICIO, ALIAS_MICROSERIVICIO, ICON_MICROSERVICIO, ORDEN_MICROSERVICIO, ",
        "condicion":{
            "NOMBRE_MODULO": {
                "conector_logico":"",
                "operador": "IN",
                "valor_condicion": `${permisosAsignadosArray.toString()}`
            }
        },
        "agrupar":"",
        "ordenar":""
    }

    console.log(dataConfiguracionMSM)

    const endpointMicroservicios = '/api/microservicios/get'
    Promise.all([
        createAxiosInstance().post(endpointMicroservicios, dataMicroservicios),
    ])
    .then(([microservicios]) => {
        console.log(microservicios.data)
    })
}