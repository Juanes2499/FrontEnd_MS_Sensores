import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubMenu from './Submenu';
import Sidemenu2 from './Sidemenu2';
import { IconContext } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Dropdown, ButtonToolbar } from 'rsuite';
import './Sidebar.css';
import Cookies from 'universal-cookie'

//Elementos
import Button from '../Button/Button';

//Actions
import {SidebarAction_ConsultarMenu} from '../../../Acciones/Sidebar/SidebarAction';
import {LoginAction_CerrarSesion} from '../../../Acciones/Login/LoginAction';

//shared
import { decodeToken } from '../../../Shared/helper';

//cookies
const cookies = new Cookies();

const Nav = styled.div`
  background: rgba(15, 0, 83, 0.863);
  height: 80px;
  align-items: center;
  display: flex;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightSide = styled.div`
  right: 2rem;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 20px;
  align-items: center;
  width: 40vw;
  justify-content: end;
`;

const SidebarNav = styled.nav`
  background: rgb(15, 0, 83);
  width: 340px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const CustomDropdown = ({title, trigger}) => (
  <Dropdown trigger={trigger} title={<span className='hover-dropdown'>{title}</span>}>
    <Dropdown.Item>New File</Dropdown.Item>
    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item>Download As...</Dropdown.Item>
  </Dropdown>
);


const Sidebar = ({sideType}) => {
    
    const [sidebar, setSidebar] = useState(false);
    const [SidebarData2, setSidebarData] = useState([]);


    useEffect(() => {
      SidebarAction_ConsultarMenu().then(data => {
        setSidebarData(data)
      })
    }, [])

    const showSidebar = () => {
      setSidebar(!sidebar)
      SidebarAction_ConsultarMenu().then(data => {
        setSidebarData(data)
      });
    };


    let token = '';
    let decodificado = {};
    
    try{
      token =  cookies.get('token');
      decodeToken(token, (res) => {
        decodificado['USUARIO'] = `${res.NOMBRES} ${res.APELLIDOS} - ${res.EMAIL}`
      })
    }catch{
      LoginAction_CerrarSesion()
    }
    

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
                <NavIcon to='#'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>
                <RightSide>
                <ButtonToolbar>
                  <span className='nombre-user'>Bienvenido: {decodificado.USUARIO}</span>
                  </ButtonToolbar>
                    <Button buttonStyle='btn--outline' onClick={() => LoginAction_CerrarSesion()} to="/Home">Cerrar Sesión</Button>
                  </RightSide>
            </Nav>
            { 
              sideType === 1 ?
                <SidebarNav sidebar={sidebar}>
                  <SidebarWrap>
                      <NavIcon to='#'>
                        <AiIcons.AiOutlineClose onClick={showSidebar} />
                      </NavIcon>
                      {SidebarData2.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                      })}
                      
                  </SidebarWrap> 
                  
                </SidebarNav>
              :
              <Sidemenu2 show={sidebar} dataMenu={SidebarData2}/>
            }
        </IconContext.Provider>
        </>
    );
};

export default Sidebar;
