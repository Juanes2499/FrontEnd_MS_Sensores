import Cookies from 'universal-cookie'
import { createAxiosInstance } from '../../Shared/helper';
import { useHistory } from 'react-router-dom';
import history from '../../Shared/createHistory';

const API_AUTH_HOST = window.API_AUTH_HOST


export const columnasDataTable = [
    {
        key: "ID_USUARIO",
        text: "ID Usuario",
        width: 300,
        align: "left",
        fixed: true,
        resizable: true,
        sortable: true
    },
    {
        key: "NOMBRES",
        text: "Nombres Usuario",
        width: 200,
        align: "left",
        fixed: false,
        resizable: true,
        sortable: true
    },
    {
        key: "APELLIDOS",
        text: "Apellidos Usuarios",
        width: 200,
        align: "left",
        fixed: false,
        resizable: true,
        sortable: true
    },
    {
        key: "TIPO_DOC_ID",
        text: "Tipo Documento Usuario",
        width: 150,
        align: "center",
        fixed: false,
        resizable: true,
        sortable: true
    },
    {
        key: "EMAIL",
        text: "Email",
        width: 300,
        align: "left",
        fixed: false,
        resizable: true,
        sortable: true
    },
    {
        key: "FECHA_CREACION",
        text: "Fecha Creación Usuario",
        width: 200,
        align: "left",
        fixed: false,
        resizable: true,
        sortable: true
    },
    {
        key: "HORA_CREACION",
        text: "Hora Creación Usuario",
        width: 200,
        align: "left",
        fixed: false,
        resizable: true,
        sortable: true
    },
    {
        key: "FECHA_ACTUALIZACION",
        text: "Fecha Actualización Usuario",
        width: 200,
        align: "left",
        fixed: false,
        resizable: true,
        sortable: true
    },
    {
        key: "HORA_ACTUALIZACION",
        text: "Hora Actualización Usuario",
        width: 200,
        align: "left",
        fixed: false,
        resizable: true,
        sortable: true
    },
]

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