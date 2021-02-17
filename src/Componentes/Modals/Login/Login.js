import React, { useState, useEffect } from 'react'
import './Login.css';
import { Form, ButtonToolbar, Button, FormGroup, Input, InputGroup, FormControl, Schema } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.min.css'

//Aciones
import { LoginAction_InicialSesion } from '../../../Acciones/Login/LoginAction';

const { StringType } = Schema.Types;

//Modal para validar la información que se esta escribiendo
const model = Schema.Model({
    email: StringType()
        .isEmail('Por favor ingresar un dirección de correo valido')
        .isRequired('Este campo es requerido'),
    password: StringType().isRequired('Este campo es requerido'),
});

//Se crea un componente para que sea laber y field
const TextField = (props) => {
    const { name, label, accepter, type, handlerValue, ...rest } = props;
    return (
        <FormGroup>
            <p className='label-field'>{label} </p>
            <FormControl name={name} accepter={accepter} type={type} onChange={handlerValue} style={{width:300, height:40 ,fontFamily: 'Arial',  fontSize:15}} {...rest}/>
        </FormGroup>
    );
}

const Login = ({isActivate, handleClose, handlerAction}) => {
    
    const [email, setEmail] = useState(''); //State para almacenar el correo electrónico
    const [password, setPassword] = useState(''); //State para almacenar la contraseña

    //Función para actualizar el estado del correo electrónico
    const emailHandler = (data) => {
        setEmail(data);
    };

    //Función para actualizar el estado de la contraseña
    const passwordHandler = (data) =>{
        setPassword(data);
    }
    
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
                            <TextField name="email" label="Correo electrónico" type="email" handlerValue={emailHandler}/>
                            <TextField name="password" label="Constraseña" type="password" handlerValue={passwordHandler}/>
                            <ButtonToolbar>
                                <div className='button-login'>
                                    <Button color='green' style={{width:130}} onClick={() => {LoginAction_InicialSesion(email, password)}}>
                                        <div className='button-login-container'>
                                            <i className="fas fa-sign-in-alt"/>
                                            <p className='button-label'> Iniciar Sesión</p>
                                        </div>
                                    </Button>
                                <Button color='red' style={{width:130}} onClick={handleClose}>
                                    <div className='button-login'>
                                        <i className="far fa-times-circle"></i>
                                        <p className='button-label'>Cancelar</p>
                                    </div>
                                </Button>
                                </div>
                            </ButtonToolbar>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
