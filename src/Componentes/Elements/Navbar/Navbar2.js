import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
//import { Icon } from 'rsuite';
//import 'rsuite/dist/styles/rsuite-default.min.css'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click); //Función para cambiar el icono de menu, si esta cerrado es el icono de hamburgesa y si esta abierto es el icono de cerrar
  const closeMobileMenu = () => setClick(false); //Función para cuando se de clic en una de las opciones del menú, el menú se cierre

  //Función para mostrar el botón hamburgesa después de que la pantalla sea menor o igual que 960
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  
  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/Home' className='navbar-logo' onClick={closeMobileMenu}>
                    ResCity
                    <i class="fas fa-city"></i>
                </Link>
                {/*Los iconos para cuando la pantalla es pequña aparene el icono de menu hamburgesa, si esta cerrado es el icono de hamburgesa y si esta abierto es el icono de cerrar*/}
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                {/*Las opciones del navbar aparece vertical solo cuando la pantalla es pequeña entonce se habilita el menu hamburguesa y si está es nav-menu active, de lo contrario es  nav-menu*/}
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/Home' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                            Acerca de nosotros
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/products' className='nav-links'  onClick={closeMobileMenu}>
                            Nuestras plataformas
                        </Link>
                    </li>
                    <li>
                        <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Iniciar sesión
                        </Link>
                    </li>
                </ul>
                {button && 
                    <Button buttonStyle='btn--outline'>Iniciar sesión</Button>
                }
            </div>
        </nav>
    </>
  );
}

export default Navbar;