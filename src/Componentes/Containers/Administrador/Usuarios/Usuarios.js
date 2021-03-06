import React, {Component} from 'react'
import { Schema, Button, Notification} from 'rsuite';
import './Usuarios.css'

//Action
import {columnasDataTable, UsuariosAction_ConsultarUsuarios, UsuariosAction_actualizarUsuarios, UsuariosAction_FiltrarUsuarios, UsuariosAction_CrearUsuarios} from '../../../../Acciones/Usuarios/UsuariosAction';

//Elementos
import Sidebar from '../../../Elements/Sidebar/Sidebar';
import DataTables from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';

//Modals
import ShowEditDataForm from '../../../Modals/showEditDataForm/ShowEditDataForm';

//Notificaiones
const Notify = (funcName,titulo,descripcion) => {
    Notification[funcName]({
        
        title: <span style={{fontFamily: 'Arial', fontSize:15}}>{titulo}</span>,
        description: <span style={{fontFamily: 'Arial', fontSize:15}}>{descripcion}</span>,
    });
}

//Configuration filter 
const configFilter ={
    cellHeight:70,
    cols:3,
    styleIconSummary:{
        color:'white'
    },
    styleLabelSummary: {
        color: 'rgb(255,255,255)',
        fontFamily: "Arial",
        fontWeight: 'bold',
        fontSize: '150%',
    },
    styleAccordionSummary: {
        backgroundColor:'rgba(17, 0, 94, 0.808)', 
        borderRadius:'5px'
    }
}

//Configuration table 
const configTable ={
    height: 400,
    bordered: true,
    cellBordered: false,
    autoHeight: false,
    style:{
        borderRadius:'10px'
    },
    resizable: true,
    headerStyle: {
        display:'flex',
        fontFamily:'Arial', 
        fontSize:'110%',
        //color:'rgb(255, 255, 255)',
        color:'rgb(0, 0, 0)',
        //backgroundColor:'rgb(0, 0, 0)'
    },
    cellStyle: {
        display:'flex',
        fontFamily:'Arial', 
        fontSize:'100%',
        color:'rgb(148, 148, 148)',
    }
}

//Schema modal Form
const { StringType } = Schema.Types;

const modelSchemaModal = Schema.Model({
    email: StringType()
        .isEmail('Por favor ingresar un dirección de correo valido')
        .isRequired('Este campo es requerido'),
    password: StringType().isRequired('Este campo es requerido'),
});

const modelSchemaModalNewUsuario = Schema.Model({
    NOMBRES: StringType().isRequired('Este campo es requerido'),
    APELLIDOS: StringType().isRequired('Este campo es requerido'),
    TIPO_DOC_ID: StringType().isRequired('Este campo es requerido'),
    NUMERO_DOC_ID: StringType().isRequired('Este campo es requerido'),
    EMAIL: StringType()
        .isEmail('Por favor ingresar un dirección de correo valido')
        .isRequired('Este campo es requerido'),
    PASSWORD: StringType().isRequired('Este campo es requerido'),
});


class Usuarios extends Component {

    state = {
        dataUsuario: [],
        activateModal: false,
        activateModalNewUser: false,
        dataSeleccionado: {},
        FormModal : [
            {
                name: "ID_USUARIO",
                label: "ID Usuario",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[0].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "NOMBRES",
                label: "Nombres",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[1].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "APELLIDOS",
                label: "Apellidos",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[2].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "TIPO_DOC_ID",
                label: "Tipo Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[3].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "NUMERO_DOC_ID",
                label: "Número Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[4].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[5].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "ACTIVO",
                label: "Usuario Activo",
                type: "toggle",
                dataEntryType:'toggle',
                readOnly: false,
                valueState: false,
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[6].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            }
        ],
        formFilter:[
            {
                name: "ID_USUARIO",
                label: "ID Usuario",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[0].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "NOMBRES",
                label: "Nombres",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[1].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[1].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "APELLIDOS",
                label: "Apellidos",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[2].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[2].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "TIPO_DOC_ID",
                label: "Tipo Documento",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[3].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[3].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "NUMERO_DOC_ID",
                label: "Número Documento",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[4].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[4].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[5].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[5].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "FECHA_CREACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datePicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[6].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[6].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "HORA_CREACION",
                label: "Hora Creación",
                type: "time",
                dataEntryType:'timepicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[7].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[7].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "FECHA_ACTUALIZACION",
                label: "Fecha Actualización",
                type: "date",
                dataEntryType:'datePicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[8].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[8].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "HORA_ACTUALIZACION_FILTER",
                label: "Hora Actualización",
                type: "time",
                dataEntryType:'timepicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[9].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[9].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            }
        ],
        newUserModal:[
            {
                name: "NOMBRES",
                label: "Nombres",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[0].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "APELLIDOS",
                label: "Apellidos",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[1].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "TIPO_DOC_ID",
                label: "Tipo Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[2].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "NUMERO_DOC_ID",
                label: "Número Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[3].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[4].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "PASSWORD",
                label: "Contraseña",
                type: "password",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[5].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "ACTIVO",
                label: "Usuario Activo",
                type: "toggle",
                dataEntryType:'toggle',
                readOnly: false,
                valueState: false,
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[6].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            }
        ]
    };

    bottonsFooterModal = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-user-edit',
            onClick: () => {
                
                let dataJson = {};
                
                let newFormModal = this.state.FormModal;
                dataJson['ID_USUARIO'] = newFormModal[0].valueState;
                dataJson['NOMBRES'] = newFormModal[1].valueState;
                dataJson['APELLIDOS'] = newFormModal[2].valueState;
                dataJson['TIPO_DOC_ID'] = newFormModal[3].valueState;
                dataJson['NUMERO_DOC_ID'] = newFormModal[4].valueState;
                dataJson['EMAIL'] = newFormModal[5].valueState;
                dataJson['ACTIVO'] = newFormModal[6].valueState;

                UsuariosAction_actualizarUsuarios(dataJson)
            },
        }
    ]

    bottonsFooterFilter = [
        {
            labelButton: "Limpiar campos",
            color: "blue",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-eraser',
            onClick: () => {

                let newFormFilter = this.state.formFilter;
                newFormFilter[0].valueState = '';
                newFormFilter[1].valueState = '';
                newFormFilter[2].valueState = '';
                newFormFilter[3].valueState = '';
                newFormFilter[4].valueState = '';
                newFormFilter[5].valueState = '';
                newFormFilter[6].valueState = '';
                newFormFilter[7].valueState = '';
                newFormFilter[8].valueState = '';
                newFormFilter[9].valueState = '';
                this.setState({formFilter: newFormFilter});    
                
                UsuariosAction_ConsultarUsuarios()
                    .then(result => {
                        this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    })
            },
        },
        {
            labelButton: "Consultar",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-search',
            onClick: () => {
        
                let dataJsonObject = {}
                
                let newFormFilter = this.state.formFilter;
                
                let i = 0;
                newFormFilter.forEach(x => {
                    if(x.valueState !== ''){
                        dataJsonObject[`${x.name}`] = {
                            conector_logico: i === 0 ? '' : x.operador.filter(i => i.includes('_'))[0].replace("_",""),
                            operador: x.operador.filter(i => !i.includes('_'))[0],
                            valor_condicion: x.valueState
                        }
                        i += 1;
                    }
                })
            
                UsuariosAction_FiltrarUsuarios(dataJsonObject).then(result => {
                    this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                })
            }
        },
    ]

    bottonsHeaderFilter = [
        {
            labelButton: "",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                this.setState({activateModalNewUser: true})
            }
        },
    ]

    bottonsFooterModalNewUser = [
        {
            labelButton: "Crear Usuario",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newUserModalNewUser = this.state.newUserModal;
                dataJson['NOMBRES'] = newUserModalNewUser[0].valueState;
                dataJson['APELLIDOS'] = newUserModalNewUser[1].valueState;
                dataJson['TIPO_DOC_ID'] = newUserModalNewUser[2].valueState;
                dataJson['NUMERO_DOC_ID'] = newUserModalNewUser[3].valueState;
                dataJson['EMAIL'] = newUserModalNewUser[4].valueState;
                dataJson['PASSWORD'] = newUserModalNewUser[5].valueState;
                dataJson['ACTIVO'] = newUserModalNewUser[6].valueState;

                UsuariosAction_CrearUsuarios(dataJson)
                Notify('success','Usuario Creado',`El usuario: ${newUserModalNewUser[0].valueState} ${newUserModalNewUser[1].valueState} con correo electrónico: ${newUserModalNewUser[4].valueState} ha sido creado correctamente`)
            },
        }
    ]


    dataSeleccionado = (data) => {
        this.setState({activateModal: true})
        this.setState({dataSeleccionado: data})

        let newFormModal = this.state.FormModal;
        newFormModal[0].valueState = data.ID_USUARIO
        newFormModal[1].valueState = data.NOMBRES
        newFormModal[2].valueState = data.APELLIDOS
        newFormModal[3].valueState = data.TIPO_DOC_ID
        newFormModal[4].valueState = data.NUMERO_DOC_ID
        newFormModal[5].valueState = data.EMAIL
        newFormModal[6].valueState = data.ACTIVO
        this.setState({FormModal: newFormModal});
    }

    closeModal = () => {
        this.setState({activateModal: false})
    }

    closeModalNewUser = () => {
        this.setState({activateModalNewUser: false})
    }
    
    componentDidMount = () => {
        UsuariosAction_ConsultarUsuarios()
            .then(result => {
                this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            })
    }


    render() {
        return (
            <div>
                <Sidebar key={1} sideType={2}/>
                <div className='container-usuarios'>
                    <Filter
                        key={2}
                        bottonsHeader={this.bottonsHeaderFilter}
                        formFilter={this.state.formFilter}
                        configuration={configFilter}
                        actions={this.bottonsFooterFilter}
                    />
                    <br/>
                    <DataTables 
                        key={this.state.dataUsuario.id} 
                        configuration={configTable} 
                        data={this.state.dataUsuario} 
                        columns={columnasDataTable} 
                        handleOnRowClick={this.dataSeleccionado}
                    />
                </div>
                <ShowEditDataForm
                    key={3}
                    layaout = "vertical"
                    isActivate={this.state.activateModal}
                    tittleModal={'Editar Usuario'}
                    handleClose={this.closeModal}
                    modelSchema={modelSchemaModal}
                    fields={this.state.FormModal}
                    bottonFooter={this.bottonsFooterModal}
                />
                <ShowEditDataForm
                    key={4}
                    layaout = "vertical"
                    isActivate={this.state.activateModalNewUser}
                    tittleModal={'Nuevo Usuario'}
                    handleClose={this.closeModalNewUser}
                    modelSchema={modelSchemaModalNewUsuario}
                    fields={this.state.newUserModal}
                    bottonFooter={this.bottonsFooterModalNewUser}
                />
            </div>
        )
    }
}

export default Usuarios
