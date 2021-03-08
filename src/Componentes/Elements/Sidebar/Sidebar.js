import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import { IconContext } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';
import './Sidebar.css';
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router-dom';

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
  grid-template-columns: repeat(3, auto);
  grid-gap: 20px;
  align-items: center;
  width: 40vw;
  justify-content: end;
`;

const Sidebar = () => {
    
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
        decodificado['NOMBRES_APELLIDOS'] = `${res.NOMBRES} ${res.APELLIDOS}`
        decodificado['EMAIL'] = ` ${res.EMAIL}`
      })
    }catch{
      LoginAction_CerrarSesion()
    }

    const history = useHistory()
    
    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
                <NavIcon to='#'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>
                <RightSide>
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 32 32"><g transform="translate(-1093 -16.291)"><circle style={{fill:'#fff'}} cx="16" cy="16" r="16" transform="translate(1093 16.291)"/><path style={{fill:'#3b3798'}} d="M133.942,21.313a3.949,3.949,0,1,0-3.955-3.955A3.956,3.956,0,0,0,133.942,21.313Zm0-6.867a2.912,2.912,0,1,1-2.912,2.912A2.92,2.92,0,0,1,133.942,14.446Z" transform="translate(974.749 11.139)"/><path className="b" d="M.522,346.41H14.256a.518.518,0,0,0,.522-.522,4.968,4.968,0,0,0-4.962-4.962H4.962A4.968,4.968,0,0,0,0,345.888.518.518,0,0,0,.522,346.41Zm4.441-4.441H9.815a3.916,3.916,0,0,1,3.882,3.4H1.08A3.927,3.927,0,0,1,4.962,341.969Z" transform="translate(1101.326 -307.782)"/></g></svg>
                  <div>
                    <p className='nombre-user'>{decodificado.NOMBRES_APELLIDOS}</p>
                    <p className='email-user'>{decodificado.EMAIL}</p>
                  </div>
                  <svg 
                    onClick={() => {
                      LoginAction_CerrarSesion();
                      history.push('/Home')
                    }}  
                    xmlns="http://www.w3.org/2000/svg" 
                    width="45" 
                    height="45"
                    viewBox="0 0 24 24" 
                    style={{fill:'#fff'}}><g transform="translate(0 -0.85)"><g transform="translate(0 0.85)"><g transform="translate(0 0)"><path className="a" d="M11.444,22.85H2.861a.978.978,0,0,1-.954-1v-18a.978.978,0,0,1,.954-1h8.583a.977.977,0,0,0,.954-1,.977.977,0,0,0-.954-1H2.861A2.937,2.937,0,0,0,0,3.85v18a2.937,2.937,0,0,0,2.861,3h8.583a1,1,0,0,0,0-2Z" transform="translate(0 -0.85)"/></g></g><g transform="translate(8.665 6.174)"><path className="a" d="M185.151,113.161l-5.8-5.722a.954.954,0,0,0-1.339,1.358l4.144,4.089h-11.1a.954.954,0,0,0,0,1.907h11.1l-4.144,4.089a.954.954,0,1,0,1.339,1.358l5.8-5.722a.953.953,0,0,0,0-1.358Z" transform="translate(-170.1 -107.165)"/></g></g></svg>
                </RightSide>
            </Nav>
            <Sidemenu show={sidebar} dataMenu={SidebarData2} homePage='/Administrator'/>
        </IconContext.Provider>
        </>
    );
};

export default Sidebar;
