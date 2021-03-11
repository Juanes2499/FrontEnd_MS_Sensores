import React, { Component } from 'react'
import './Microservicios.css'

//Elementos
import Sidebar from '../../../Elements/Sidebar/Sidebar';
import { DataTableColAction } from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';
import { Notify } from '../../../Elements/Notify/Notify';
import { Confirmation } from '../../../Elements/Confirmation/Confirmation';
import Footer from '../../../Elements/Footer/Footer';

//Actions
import { MicroserviciosAction_ConsultarMicroservicios } from '../../../../Acciones/Microservicios/MicroserviciosAction';

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

export class Microservicios extends Component {

    //Estados
    state = {
        dataMicroservicios: [],
        //Form para el filtro
        formFilter:[
            {
                name: "ID_MICROSERVICIO",
                label: "ID Microservicio",
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
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
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
                name: "URL_MICROSERVICIO",
                label: "URL Microservicio",
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
                name: "ALIAS_MICROSERIVICIO",
                label: "Alias Microservicio",
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
                name: "URL_ALIAS_MICROSERVICIO",
                label: "URL Alias Microservicio",
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
                name: "FECHA_CREACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datepicker',
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
                name: "HORA_CREACION",
                label: "Hora Creación",
                type: "time",
                dataEntryType:'timepicker',
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
                name: "FECHA_ACTUALIZACION",
                label: "Fecha Actualización",
                type: "date",
                dataEntryType:'datepicker',
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
                name: "HORA_ACTUALIZACION",
                label: "Hora Actualización",
                type: "time",
                dataEntryType:'timepicker',
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
        ]
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_MICROSERVICIO",
            text: "ID Microservicio",
            width: 300,
            align: "left",
            fixed: true,
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
            key: "DETALLES",
            text: "Detalles",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "URL_MICROSERVICIO",
            text: "URL Microservicio",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ALIAS_MICROSERIVICIO",
            text: "Alias Microservicio",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "URL_ALIAS_MICROSERVICIO",
            text: "URL Alias Microservicio",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ORDEN",
            text: "Orden",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ICON_MICROSERVICIO",
            text: "Icono Microservicio",
            width: 200,
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
        dataKey: 'ID_USUARIO',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    
                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-edit',
                onClick: (data, dataKey) => {
                    
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
                
                MicroserviciosAction_ConsultarMicroservicios()
                    .then(result => {
                        this.setState({dataMicroservicios: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
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
            
                // UsuariosAction_FiltrarUsuarios(dataJsonObject).then(result => {
                //     this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                // })
            }
        },
    ]


    componentDidMount = () => {
        MicroserviciosAction_ConsultarMicroservicios()
            .then((response) => {
                this.setState({dataMicroservicios: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    render() {

        return (
            <div>
                <Sidebar key={1}/>
                    <div className='container-microservicios'>
                        <Filter
                            key={2}
                            titleHeader='Microservicios'
                            bottonsHeader={this.bottonsHeaderFilter}
                            formFilter={this.state.formFilter}
                            configuration={configFilter}
                            actions={this.bottonsFooterFilter}
                        />
                        <br/>
                        <DataTableColAction 
                            key={this.state.dataMicroservicios.id} 
                            configuration={configTable} 
                            data={this.state.dataMicroservicios} 
                            columns={this.columnsDataTabe} 
                            buttonActions={this.bottonsActionsTable}
                        />
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default Microservicios
