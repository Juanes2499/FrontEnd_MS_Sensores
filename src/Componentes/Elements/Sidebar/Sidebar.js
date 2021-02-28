import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubMenu from './Submenu';
import Sidemenu2 from './Sidemenu2';
import { IconContext } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

//Actions
import {SidebarAction_ConsultarMenu} from '../../../Acciones/Sidebar/SidebarAction';

const Nav = styled.div`
  background: rgba(15, 0, 83, 0.863);
  height: 80px;
  display: flex;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const Sidebar = ({sideType}) => {
    const [sidebar, setSidebar] = useState(false);
    const [SidebarData2, setSidebarData] = useState([]);

    const showSidebar = () => {
      setSidebar(!sidebar)
      SidebarAction_ConsultarMenu().then(data => {
        setSidebarData(data)
      });
    };
    

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
              <NavIcon to='#'>
                  <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon>

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
