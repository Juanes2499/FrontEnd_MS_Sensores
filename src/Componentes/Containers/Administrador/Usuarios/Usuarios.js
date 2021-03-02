import React, {Component} from 'react'
import { Schema } from 'rsuite';
import './Usuarios.css'

//Action
import {columnasDataTable, UsuariosAction_ConsultarUsuarios, UsuariosAction_actualizarUsuarios, UsuariosAction_FiltrarUsuarios} from '../../../../Acciones/Usuarios/UsuariosAction';

//Elementos
import Sidebar from '../../../Elements/Sidebar/Sidebar';
import DataTables from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';

//Modals
import ShowEditDataForm from '../../../Modals/showEditDataForm/ShowEditDataForm';

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
class Usuarios extends Component {

    state = {
        dataUsuario: [],
        activateModal: false,
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
                operador: '=',
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
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[1].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "APELLIDOS",
                label: "Apellidos",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[2].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "TIPO_DOC_ID",
                label: "Tipo Documento",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[3].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "NUMERO_DOC_ID",
                label: "Número Documento",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[4].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[5].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "FECHA_CREACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datePicker',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[6].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "HORA_CREACION",
                label: "Hora Creación",
                type: "time",
                dataEntryType:'timepicker',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[7].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "FECHA_ACTUALIZACION",
                label: "Fecha Actualización",
                type: "date",
                dataEntryType:'datePicker',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[8].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "HORA_ACTUALIZACION_FILTER",
                label: "Hora Actualización",
                type: "time",
                dataEntryType:'timepicker',
                valueState: '',
                operador: '=',
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[9].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
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
                            conector_logico: i >= 1 ? 'AND' : '',
                            operador: x.operador,
                            valor_condicion: x.valueState
                        }
                    }
                    i += 1;
                })
            
                UsuariosAction_FiltrarUsuarios(dataJsonObject)
            }
        },
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
    
    componentDidMount = () => {
        UsuariosAction_ConsultarUsuarios()
            .then(result => {
                this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            })
    }


    render() {
        return (
            <div>
                <Sidebar sideType={2}/>
                <div className='container-usuarios'>
                    <Filter
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
                    layaout = "vertical"
                    isActivate={this.state.activateModal}
                    tittleModal={'Editar usuario'}
                    handleClose={this.closeModal}
                    modelSchema={modelSchemaModal}
                    fields={this.state.FormModal}
                    bottonFooter={this.bottonsFooterModal}
                />
            </div>
        )
    }
}

export default Usuarios
