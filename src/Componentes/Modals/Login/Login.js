import React from 'react'
import './Login.css';
import { Form, ButtonToolbar, Button, FormGroup, ControlLabel, FormControl } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.min.css'
import { Schema } from 'rsuite';

const { StringType } = Schema.Types;
const model = Schema.Model({
    email: StringType()
        .isEmail('Por favor ingresar un dirección de correo valido')
        .isRequired('Este campo es requerido'),
    password: StringType().isRequired('Este campo es requerido'),
});

const TextField = (props) => {
    const { name, label, accepter, type, ...rest } = props;
    return (
        <FormGroup>
            <p className='label-field'>{label} </p>
            <FormControl name={name} accepter={accepter} type={type} {...rest} className='field'/>
        </FormGroup>
    );
}

const Login = ({isActivate, handleClose, size}) => {    
    return (
        <div>
            <div hidden={isActivate} className='login-modal-container'> 
                <div className='login-modal-block'>
                    <div className='login-modal-header'>
                        <p className='titulo-header'>Iniciar Sesión</p>    
                        <span className='cerrar-header'> <i className='fas fa-times fa-lg' onClick={handleClose}/> </span> 
                    </div>
                    <div className='login-modal-linea'></div>
                    <div className='login-modal-body'>
                        <Form fluid model={model} layout="horizontal">
                            <TextField name="email" label="Correo electrónico" type="email"/>
                            <TextField name="password" label="Constraseña" type="password"/>
                            <ButtonToolbar>
                                <Button appearance="primary" type="submit">
                                    Submit
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
