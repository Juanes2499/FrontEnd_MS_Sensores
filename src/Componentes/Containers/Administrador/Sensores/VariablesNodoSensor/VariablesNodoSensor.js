import React, { Component } from 'react'
import { Schema } from 'rsuite';
import './VariablesNodoSensor.css'

//Elementos
import { DataTableColAction } from '../../../../Elements/DataTable/DataTable';
import Filter from '../../../../Elements/Filter/Filter';
import { Notify } from '../../../../Elements/Notify/Notify';
import { Confirmation } from '../../../../Elements/Confirmation/Confirmation';

//Modals
import ShowEditDataForm from '../../../../Modals/showEditDataForm/ShowEditDataForm';

//Actions
import { 
    VariablesNodoSensoresAction_ConsultarVariables,
    VariablesNodoSensoresAction_CrearVariables,
    VariablesNodoSensoresAction_ActualizarVariables,
    VariablesNodoSensoresAction_EliminarVariables
} from '../../../../../Acciones/Sensores/VariablesNodoSensor/VariablesNodoSensorAction';

//Schemas
const { StringType } = Schema.Types;
const schemaModalModulo = Schema.Model({
    NOMBRE_MODULO: StringType().isRequired('Este campo es requerido'),
    DETALLES: StringType().isRequired('Este campo es requerido'),
    URL_MODULO: StringType().isRequired('Este campo es requerido'),
    ALIAS_MODULO: StringType().isRequired('Este campo es requerido'),
    URL_ALIAS_MODULO: StringType().isRequired('Este campo es requerido'),
    ORDEN: StringType().isRequired('Este campo es requerido'),
    ICON_MODULO: StringType().isRequired('Este campo es requerido'),
});

//Configuration filter 
const configFilter ={
    cellHeight:70,
    cols:3,
    styleIconSummary:{
        color:'white'
    },
    styleLabelSummary: {
        color: 'rgb(255,255,255)',
        fontFamily: "Roboto",
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
        fontFamily:'Roboto', 
        fontSize:'110%',
        //color:'rgb(255, 255, 255)',
        color:'rgb(0, 0, 0)',
        //backgroundColor:'rgb(0, 0, 0)'
    },
    cellStyle: {
        display:'flex',
        fontFamily:'Roboto', 
        fontSize:'100%',
        color:'rgb(148, 148, 148)',
    }
}

export class VariablesNodoSensor extends Component {
    //Estados
    state = {
        //Estado para actulizar cuando se realice una acción
        dataActualizada: false,
        //Estados para cargar la data
        data: [],
        //Estado para cargar la data del mapa
        dataMap: [],
        //Estados para el componente showDataEditForm
        showDataEditForm_show: false,
        showDataEditForm_title: '',
        showDataEditForm_schema: null,
        showDataEditForm_fields: [],
        showDataEditForm_bottonFooter:[],
        //Estado para el componente de confirmación
        showConfirmacion: false,
        tituloConfirmacion:'', 
        cuerpoConfirmacion:'',
        handleAceptarConfirmacion:()=>{},
        //Form para el filtro
        formFilter:[
            {
                name: "ID_VARIABLE",
                label: "ID Variable",
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
                name: "NOMBRE_VARIABLE",
                label: "Nombre Variable",
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
                name: "DETALLES",
                label: "Detalles",
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
                name: "TIPO_DATO",
                label: "Tipo de Dato",
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
                name: "UNIDAD_MEDIDA",
                label: "Unidad de Medida",
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
                name: "RANGO_MIN",
                label: "Rango Mínimo",
                type: "text",
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
                name: "RANGO_MAX",
                label: "Rango Máximo",
                type: "text",
                dataEntryType:'input',
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
                name: "ESTADO",
                label: "Estado",
                type: "text",
                dataEntryType:'input',
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
                name: "FECHA_CREACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datepicker',
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
                name: "HORA_CREACION",
                label: "Hora Creación",
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
            },
            {
                name: "FECHA_ACTUALIZACION",
                label: "Fecha Actualización",
                type: "date",
                dataEntryType:'datepicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[10].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[10].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "HORA_ACTUALIZACION",
                label: "Hora Actualización",
                type: "time",
                dataEntryType:'timepicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[11].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[11].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
        ],
        //Form para nuevo registros
        formNew:[
            {
                name: "NOMBRE_VARIABLE",
                label: "Nombre Variable",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[0].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "DETALLES",
                label: "Detalles",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[1].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "TIPO_DATO",
                label: "Tipo Dato",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[2].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "UNIDAD_MEDIDA",
                label: "Unidad Media",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[3].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "RANGO_MIN",
                label: "Rango Mínimo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[4].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "RANGO_MAX",
                label: "Rango Máximo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[5].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "ESTADO",
                label: "Estado",
                type: "toggle",
                dataEntryType:'toggle',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[6].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
        ],
        //Form para actualizar un registro
        formUpdate:[
            {
                name: "ID_VARIABLE",
                label: "ID Variable",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[0].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
            {
                name: "NOMBRE_VARIABLE",
                label: "Nombre Variable",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[1].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
            {
                name: "DETALLES",
                label: "Detalles",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[2].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
            {
                name: "TIPO_DATO",
                label: "Tipo Dato",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[3].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
            {
                name: "UNIDAD_MEDIDA",
                label: "Unidad Media",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[4].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
            {
                name: "RANGO_MIN",
                label: "Rango Mínimo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[5].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
            {
                name: "RANGO_MAX",
                label: "Rango Máximo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[6].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
            {
                name: "ESTADO",
                label: "Estado",
                type: "toggle",
                dataEntryType:'toggle',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formUpdate;
                    newModal[7].valueState = data;
                    this.setState({formUpdate: newModal});
                },
            },
        ]
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_VARIABLE",
            text: "ID Variable",
            width: 300,
            align: "left",
            fixed: true,
            resizable: true,
        },
        {
            key: "NOMBRE_VARIABLE",
            text: "Nombre Variable",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "DETALLES",
            text: "Detalles",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "TIPO_DATO",
            text: "Tipo Dato",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "UNIDAD_MEDIDA",
            text: "Unidad Medida",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "RANGO_MIN",
            text: "Rango Mínimo",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "RANGO_MAX",
            text: "Rango Máximo",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ESTADO",
            text: "Estado",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "FECHA_CREACION",
            text: "Fecha Creación",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "HORA_CREACION",
            text: "Hora Creación",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "FECHA_ACTUALIZACION",
            text: "Fecha Actualización",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "HORA_ACTUALIZACION",
            text: "Hora Actualización",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
        },
    ]

    //Arreglo de las acciones de los botones de la tabla
    bottonsActionsTable = {
        dataKey: 'ID_VARIABLE',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_variable'] = data.ID_VARIABLE;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar Variable Nodo Sensor',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar la Variable Nodo Sensor con ID: ${data.ID_VARIABLE}?`,
                        handleAceptarConfirmacion: () => {
                            VariablesNodoSensoresAction_EliminarVariables(dataJson).then(() => {
                                Notify('success','Nodo Sensor eliminado',`La Variable Nodo Sensor: ${data.ID_VARIABLE} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Variable Nodo Sensordulo no eliminada',`La Variable Nodo Sensor con ID: ${data.ID_VARIABLE} no ha podido ser eliminado, comunicarse con el área de TI`)
                            })
                        }
                    }) 
                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-edit',
                onClick: (data, dataKey) => {

                    let updateForm = this.state.formUpdate;
                    updateForm[0].valueState = data.ID_VARIABLE
                    updateForm[1].valueState = data.NOMBRE_VARIABLE
                    updateForm[2].valueState = data.DETALLES
                    updateForm[3].valueState = data.TIPO_DATO
                    updateForm[4].valueState = data.UNIDAD_MEDIDA
                    updateForm[5].valueState = data.RANGO_MIN
                    updateForm[6].valueState = data.RANGO_MAX
                    updateForm[7].valueState = data.ESTADO
                    this.setState({formUpdate: updateForm});

                    this.setState({
                        showDataEditForm_show: true,
                        showDataEditForm_title: 'Editar Módulo',
                        showDataEditForm_schema: schemaModalModulo,
                        showDataEditForm_fields: this.state.formUpdate,
                        showDataEditForm_bottonFooter: this.bottonsFooterModalUpdate
                    })

                },
            }
        ]
    }

    //Arreglo de los botones de las acciones del header del filtro
    bottonsHeaderFilter = [
        {
            labelButton: "",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                this.setState({
                    showDataEditForm_show: true,
                    showDataEditForm_title: 'Nueva Variable',
                    showDataEditForm_schema: schemaModalModulo,
                    showDataEditForm_fields: this.state.formNew,
                    showDataEditForm_bottonFooter: this.bottonsFooterModalNewRegister
                })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer del filtro
    bottonsFooterFilter = [
        {
            labelButton: "Limpiar campos",
            color: "blue",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-eraser',
            onClick: () => {

                let newFormFilter = this.state.formFilter;
                
                newFormFilter.forEach(x => {
                    x.valueState = '';
                })

                this.setState({formFilter: newFormFilter});    
                
                VariablesNodoSensoresAction_ConsultarVariables()
                    .then(result => {
                        this.setState({data: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
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
            
                VariablesNodoSensoresAction_ConsultarVariables(dataJsonObject)
                    .then(result => {
                        this.setState({data: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nuevo registro
    bottonsFooterModalNewRegister = [
        {
            labelButton: "Crear Variable",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newRegister = this.state.formNew;

                let nullFields = [];

                newRegister.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando Variable Nodo Sensor',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    VariablesNodoSensoresAction_CrearVariables(dataJson).then(() => {
                        Notify('success','Variable Nodo Sensor creado',`La variable nodo sensor: ${newRegister[0].valueState} ha sido creado existosamente`)
                        this.setState({dataActualizada: true})
                        newRegister.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNew: newRegister});
                    }).catch((err) => {
                        Notify('error','Variable Nodo Sensor no creado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    //Arreglo de los botones de las acciones del footer para actualizar un registro
    bottonsFooterModalUpdate = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-edit',
            onClick: () => {
                
                let dataJson = {};
                
                let update = this.state.formUpdate;

                let nullFields = [];

                update.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })

                console.log(dataJson)
            
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando Variable Nodo Sensor',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    VariablesNodoSensoresAction_ActualizarVariables(dataJson).then(() => {
                        Notify('success','Variable Nodo Sensor actualizado',`La Variable Nodo Sensor: ${update[1].valueState} ha sido actualizado existosamente`)
                        this.setState({dataActualizada: true})
                        update.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({showDataEditForm_show: false});
                    }).catch((err) => {
                        Notify('error','Variable Nodo Sensor no actualizado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    componentDidMount = () => {
        VariablesNodoSensoresAction_ConsultarVariables()
            .then((response) => {
                this.setState({data: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            VariablesNodoSensoresAction_ConsultarVariables()
                .then((response) => {
                    this.setState({data: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    this.setState({dataActualizada:false})
                }).catch((err) => {
                    Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
                })
        }
    }

    render() {

        return (
            <div>
                <div className='container-estandar'>
                    <Filter
                        key={2}
                        titleHeader='Variables Nodo Sensores'
                        bottonsHeader={this.bottonsHeaderFilter}
                        formFilter={this.state.formFilter}
                        configuration={configFilter}
                        actions={this.bottonsFooterFilter}
                    />
                    <br/>
                    <DataTableColAction 
                        key={this.state.data.id} 
                        configuration={configTable} 
                        data={this.state.data} 
                        columns={this.columnsDataTabe} 
                        buttonActions={this.bottonsActionsTable}
                    />
                    <br/>
                </div>
                <ShowEditDataForm
                    key={3}
                    layaout = "vertical"
                    isActivate={this.state.showDataEditForm_show}
                    tittleModal={this.state.showDataEditForm_title}
                    handleClose={() => this.setState({showDataEditForm_show: false})}
                    modelSchema={this.state.showDataEditForm_schema}
                    fields={this.state.showDataEditForm_fields}
                    bottonFooter={this.state.showDataEditForm_bottonFooter}
                />
                <Confirmation 
                    show={this.state.showConfirmacion}
                    titulo={this.state.tituloConfirmacion} 
                    cuerpo={this.state.cuerpoConfirmacion}  
                    handleClose={() => this.setState({showConfirmacion:false}) }
                    handleAceptar={this.state.handleAceptarConfirmacion}
                />
            </div>
        )
    }
}

export default VariablesNodoSensor
