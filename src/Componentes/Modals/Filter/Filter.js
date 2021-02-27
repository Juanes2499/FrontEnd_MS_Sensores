import React, { Component } from 'react'

import Input from "../../Shared/Input";
import Modal from '../../Shared/Modal';
import ModalHeader from '../../Shared/ModalHeader';
import ModalBody from '../../Shared/ModalBody';
import ModalFooter from '../../Shared/ModalFooter';
import ButtonStrip from '../../Shared/ButtonStrip';

//Action

import { operators } from '../../../utils/helpers'


class ModalFilter extends Component {
    handleCloseModal = (e) => {
        const modal = document.getElementById('modalFilter')
        modal.classList.remove('fadeIn')
        modal.classList.add('fadeOut')

        const modalDialog = document.querySelector(`#modalFilter .modal-dialog`)
        modalDialog.classList.remove('zoomIn')
        modalDialog.classList.add('zoomOut')

        setTimeout(() => this.props.showHideModalFilter(false), 300)
    }

    handleApplyFilters = (e) => {
        this.handleCloseModal()
        this.props.showBackdrop()
        this.props.applyModalFilterCriterias()
    }

    render() {
        if (!this.props.modalFilter) {
            return null
        }

        const { columnasGrilla } = this.props;

        return (
            <Modal id="modalFilter" show={true} ZIndex={2000}>
                <ModalHeader title="Filtro" onClose={e => this.handleCloseModal(e, "modalFilter")} />
                <ButtonStrip>
                    <button className="btn-buttonstrip" onClick={e => this.props.addModalFilterCriteria()} title="Nuevo"><FontAwesome name="plus-circle" /></button>
                    <button className="btn-buttonstrip" onClick={e => this.props.removeCheckedModalFilterCriterias()} title="Eliminar" disabled={this.props.modalFilters.filter(item => item.get('checked')).count() === 0}><FontAwesome name="trash" /></button>
                </ButtonStrip>
                <ModalBody>
                    <div style={{ width: '600px' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <table className="table table-bordered table-condensed">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '20px' }}></th>
                                            <th>Columna</th>
                                            <th>Operador</th>
                                            <th>Filtro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.modalFilters.count() > 0 ? this.props.modalFilters.map((item, index) => {
                                                const key = `tr2[${index}]`
                                                return (
                                                    <tr key={key} className={`${item.get('checked') ? 'info' : ''}`}>
                                                        <td style={{ verticalAlign: 'middle' }}><input type="checkbox" onChange={e => this.props.toggleCheckedModalFilterCriterias(index, e.target.checked)} checked={item.get('checked')} /></td>
                                                        <td>
                                                            <select className="form-control" value={item.get('column')} onChange={e => this.props.updateModalFilterCriteria(index, 'column', e.target.value)}>
                                                                {
                                                                    columnasGrilla.map((item1, index1) => {
                                                                        const caption = item1.get('Titulo') || item1.get('Nombre');

                                                                        return (
                                                                            <option key={`opt1[${item1.get('Id')}][${index1}]`} value={item1.get('Nombre')}>{caption}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="form-control" value={item.get('operator')} onChange={e => this.props.updateModalFilterCriteria(index, 'operator', e.target.value)}>
                                                                {
                                                                    operators.map((item1, n) => {
                                                                        return (
                                                                            <option key={`opt2[${item1.id}][${n}]`} value={item1.value}>{item1.caption}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            {this.renderInputValue(item, index)}
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>No hay filtros</td></tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-default" type="button" onClick={this.handleApplyFilters}>Filtrar</button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalFilter;