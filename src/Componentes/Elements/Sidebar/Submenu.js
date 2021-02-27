import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import './Sidebar.css';

//Action
//import {LoginAction_CerrarSesion} from '../../../Acciones/Login/LoginAction';

const SidebarLabel = styled.span`
  margin-left: 16px;
  color: #FFF
`;

const SubMenu = ({ item }) => {

  const [subnav, setSubnav] = useState(false);
  
  const showSubnav = () => setSubnav(!subnav);
  
  const history = useHistory()

  return (
    <>
      <div>
        {item.path ? 
          <Link to={item.path ? item.path  : null}>
            <button className = 'SidebarLink' onClick={item.subNav && showSubnav}>
              <div>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </div>
              <div>
                {item.subNav && subnav
                  ? item.iconOpened
                  : item.subNav
                  ? item.iconClosed
                  : null}
              </div>
            </button>
          </Link>
          :
          <button className = 'SidebarLink' onClick={item.subNav && showSubnav}>
              <div>
                <i className={`${item.icon}`}></i>
                <SidebarLabel>{item.title}</SidebarLabel>
              </div>
              <div>
                {item.subNav && subnav
                  ? item.iconOpened
                  : item.subNav
                  ? item.iconClosed
                  : null}
              </div>
            </button>
        }
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <button key={index} className='DropdownLink' onClick={() => history.push(`${item.path}`)}>
                <i className={`${item.icon}`}></i>
                <SidebarLabel>{item.title}</SidebarLabel>
              </button>
            );
        })}
      </div>
    </>
  );
};

export default SubMenu;
