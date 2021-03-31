import React, { Component } from 'react'
import { Schema } from 'rsuite';
import '../global.css'

//global
import {configTable} from '../global';

//Elementos
import { DataTableColAction } from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';
import { Notify } from '../../../Elements/Notify/Notify';
import { Confirmation } from '../../../Elements/Confirmation/Confirmation';

//Modals
import ShowEditDataForm from '../../../Modals/showEditDataForm/ShowEditDataForm';

//Actions
import { 
    ModulosAction_ActualizarModulo,
    ModulosAction_EliminarModulo
} from '../../../../Acciones/Modulos/ModulosAction';

import { 
    DispositivosAction_ConsultarDispositivos,
    DispositivosAction_ConsultarMicrosevicios,
    DispositivosAction_CrearDispositivos,
} from '../../../../Acciones/Dispositivos/DispositivosAction';

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

export class Dispositivos extends Component {
    //Estados
    state = {
        //Estado para actulizar cuando se realice una acción
        dataActualizada: false,
        //Estados para cargar la data
        dataModulo: [],
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
                name: "ID_DISPOSITIVO",
                label: "ID Dispositivo",
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
                name: "MARCA",
                label: "Marca",
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
                name: "REFERENCIA",
                label: "Referencia",
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
                name: "LATITUD",
                label: "Latitud",
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
                name: "LONGITUD",
                label: "Longitud",
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
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
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
                name: "FECHA_CREACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datepicker',
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
                name: "HORA_ACTUALIZACION",
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
            },
        ],
        //Form para nuevo microservicio
        formNew:[
            {
                name: "MARCA",
                label: "Marca",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[0].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "REFERENCIA",
                label: "Referencia",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[1].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "LATITUD",
                label: "Latitud",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[2].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "LONGITUD",
                label: "Longitud",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[3].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "NOMBRE_MICROSERVICIO",
                label: "Alias Microservicio",
                type: "text",
                dataEntryType:'selectPicker',
                readOnly: false,
                valueState: '',
                dataPicker: [],
                placeHolderPicker:'Seleccionar',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[4].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "EMAIL_RESPONSABLE",
                label: "Email Responsable",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[5].valueState = data;
                    this.setState({formNew: form});
                },
            }
        ],
        //Form para actualizar un registro
        formUpdateModulo:[
            {
                name: "ID_MODULO",
                label: "ID Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdateModulo;
                    form[0].valueState = data;
                    this.setState({formUpdateModulo: form});
                },
            },
            {
                name: "NOMBRE_MODULO",
                label: "Nombre Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdateModulo;
                    form[1].valueState = data;
                    this.setState({formUpdateModulo: form});
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
                    let form = this.state.formUpdateModulo;
                    form[2].valueState = data;
                    this.setState({formUpdateModulo: form});
                },
            },
            {
                name: "URL_MODULO",
                label: "URL Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdateModulo;
                    form[3].valueState = data;
                    this.setState({formUpdateModulo: form});
                },
            },
            {
                name: "ALIAS_MODULO",
                label: "Alias Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdateModulo;
                    form[4].valueState = data;
                    this.setState({formUpdateModulo: form});
                },
            },
            {
                name: "URL_ALIAS_MODULO",
                label: "URL Alias Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdateModulo;
                    form[5].valueState = data;
                    this.setState({formUpdateModulo: form});
                },
            },
            {
                name: "ORDEN",
                label: "Orden",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdateModulo;
                    form[6].valueState = data;
                    this.setState({formUpdateModulo: form});
                },
            },
            {
                name: "ICON_MODULO",
                label: "Icono Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdateModulo;
                    form[7].valueState = data;
                    this.setState({formUpdateModulo: form});
                },
            },
        ]
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_DISPOSITIVO",
            text: "ID Dispositivo",
            width: 300,
            align: "left",
            fixed: true,
            resizable: true,
        },
        {
            key: "TOKEN",
            text: "Token",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "MARCA",
            text: "Marca",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "REFERENCIA",
            text: "Referencia",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "LATITUD",
            text: "Latitud",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "LONGITUD",
            text: "Longitud",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ID_MICROSERVICIO",
            text: "ID Microservicio",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "NOMBRE_MICROSERVICIO",
            text: "Nombre Microservicio",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "EMAIL_RESPONSABLE",
            text: "Email Responsable",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "PASSWORD_ACTIVA",
            text: "Password Activa",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "DISPOSITIVO_ACTIVO",
            text: "Dispositivo Activo",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "FECHA_ACTUALIZACION_PASSWORD",
            text: "Fecha Actulización Password",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "HORA_ACTUALIZACION_PASSWORD",
            text: "Hora Actualización Password",
            width: 150,
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
        dataKey: 'ID_MODULO',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_modulo'] = data.ID_MODULO;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar módulo',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar el módulo: ${data.NOMBRE_MODULO}?`,
                        handleAceptarConfirmacion: () => {
                            ModulosAction_EliminarModulo(dataJson).then(() => {
                                Notify('success','Módulo eliminado',`El módulo: ${data.NOMBRE_MODULO} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Módulo no eliminado',`El módulo: ${data.NOMBRE_MODULO} no ha podido ser eliminado, comunicarse con el área de TI`)
                            })
                        }
                    }) 
                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-edit',
                onClick: (data, dataKey) => {

                    let updateForm = this.state.formUpdateModulo;
                    updateForm[0].valueState = data.ID_MODULO
                    updateForm[1].valueState = data.NOMBRE_MODULO
                    updateForm[2].valueState = data.DETALLES
                    updateForm[3].valueState = data.URL_MODULO
                    updateForm[4].valueState = data.ALIAS_MODULO
                    updateForm[5].valueState = data.URL_ALIAS_MODULO
                    updateForm[6].valueState = data.ORDEN
                    updateForm[7].valueState = data.ICON_MODULO
                    this.setState({formUpdateModulo: updateForm});

                    this.setState({
                        showDataEditForm_show: true,
                        showDataEditForm_title: 'Editar Módulo',
                        showDataEditForm_schema: schemaModalModulo,
                        showDataEditForm_fields: this.state.formUpdateModulo,
                        showDataEditForm_bottonFooter: this.bottonsFooterModalUpdateModulo
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
                    showDataEditForm_title: 'Nuevo Dispositivo',
                    showDataEditForm_schema: schemaModalModulo,
                    showDataEditForm_fields: this.state.formNew,
                    showDataEditForm_bottonFooter: this.bottonsFooterModalNewModulo
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

                let formFilter = this.state.formFilter;
                
                formFilter.forEach(x => {
                    x.valueState = '';
                })

                this.setState({formFilter: formFilter});    
                
                DispositivosAction_ConsultarDispositivos()
                    .then(result => {
                        this.setState({dataModulo: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
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
                
                let formFilter = this.state.formFilter;
                
                let i = 0;
                formFilter.forEach(x => {
                    if(x.valueState !== ''){
                        dataJsonObject[`${x.name}`] = {
                            conector_logico: i === 0 ? '' : x.operador.filter(i => i.includes('_'))[0].replace("_",""),
                            operador: x.operador.filter(i => !i.includes('_'))[0],
                            valor_condicion: x.valueState
                        }
                        i += 1;
                    }
                })
            
                DispositivosAction_ConsultarDispositivos(dataJsonObject)
                    .then(result => {
                        this.setState({dataModulo: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nuevo microservicio
    bottonsFooterModalNewModulo = [
        {
            labelButton: "Crear Módulo",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newReg = this.state.formNew;

                let nullFields = [];

                newReg.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando Dispositivo',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    DispositivosAction_CrearDispositivos(dataJson).then(() => {
                        Notify('success','Dispositivo creado',`El Dispositivo: ${newReg[0].valueState} - ${newReg[1].valueState} ha sido creado existosamente`)
                        this.setState({dataActualizada: true})
                        newReg.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNew: newReg});
                    }).catch((err) => {
                        Notify('error','Dispositivo no creado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    //Arreglo de los botones de las acciones del footer para actualizar microservicio
    bottonsFooterModalUpdateModulo = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-edit',
            onClick: () => {
                
                let dataJson = {};
                
                let updateModulo = this.state.formUpdateModulo;

                let nullFields = [];

                updateModulo.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })

                console.log(dataJson)
            
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando módulo',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    ModulosAction_ActualizarModulo(dataJson).then(() => {
                        Notify('success','Módulo actualizado',`El módulo: ${updateModulo[1].valueState} ha sido actualizado existosamente`)
                        this.setState({dataActualizada: true})
                        updateModulo.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({showDataEditForm_show: false});
                    }).catch((err) => {
                        Notify('error','Módulo no actualizado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    componentDidMount = () => {
        DispositivosAction_ConsultarDispositivos()
            .then((response) => {
                this.setState({dataModulo: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })

        DispositivosAction_ConsultarMicrosevicios()
            .then((response) => {
                let newFrom = this.state.formNew;
                newFrom[4].dataPicker = response.data.map((a, indice) => ({ ...a, id: indice + 1 }))
                this.setState({formNew: newFrom})
            }).catch((err) => {
                Notify('error','Error consultado Microservicios',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            DispositivosAction_ConsultarDispositivos()
                .then((response) => {
                    this.setState({dataModulo: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    this.setState({dataActualizada:false})
                }).catch((err) => {
                    Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
                })
        }
    }

    render() {

        return (
            <div>
                    <div className='container-global'>
                        <Filter
                            key={2}
                            titleHeader='Dispositivos'
                            bottonsHeader={this.bottonsHeaderFilter}
                            formFilter={this.state.formFilter}
                            configuration={configFilter}
                            actions={this.bottonsFooterFilter}
                        />
                        <br/>
                        <DataTableColAction 
                            key={this.state.dataModulo.id} 
                            configuration={configTable} 
                            data={this.state.dataModulo} 
                            columns={this.columnsDataTabe} 
                            buttonActions={this.bottonsActionsTable}
                        />
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

export default Dispositivos
