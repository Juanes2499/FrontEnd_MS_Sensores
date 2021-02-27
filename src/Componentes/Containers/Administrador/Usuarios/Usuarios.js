import React, {Component} from 'react'
import './Usuarios.css'

//Action
import {columnasDataTable, UsuariosAction_ConsultarUsuarios} from '../../../../Acciones/Usuarios/UsuariosAction';

//Componentes
import Sidebar from '../../../Elements/Sidebar/Sidebar';
import DataTables from '../../../Elements/DataTable/DataTable';

//Configuration table 
const configTable ={
    height: 400
}

class Usuarios extends Component {

    state = {
        dataUsuario: [],
        dataSeleccinado: {},
    };

    componentDidMount = () => {
        UsuariosAction_ConsultarUsuarios()
            .then(result => {
                this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            })
    }

    dataSeleccionado = (data) => {
        this.setState({dataSeleccinado: data})
    }
    
    render() {
        return (
            <div>
                <Sidebar/>
                <div className='container'>
                    <DataTables 
                        key={this.state.dataUsuario.id} 
                        configuration={configTable} 
                        data={this.state.dataUsuario} 
                        columns={columnasDataTable} 
                        handleOnRowClick={this.dataSeleccionado}
                    />
                </div>
            </div>
        )
    }
}

export default Usuarios
