import React, { Component } from 'react'
import './Microservicios.css'

//Elementos
import Sidebar from '../../../Elements/Sidebar/Sidebar';
import {DataTableColAction} from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';
import {Notify} from '../../../Elements/Notify/Notify';
import {Confirmation} from '../../../Elements/Confirmation/Confirmation';
import Footer from '../../../Elements/Footer/Footer';


export class Microservicios extends Component {
    render() {
        return (
            <div>
                <Sidebar key={1}/>
                <div className='container-microservicios'>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default Microservicios
