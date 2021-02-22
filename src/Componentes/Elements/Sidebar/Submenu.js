import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Sidebar.css';

const SidebarLabel = styled.span`
  margin-left: 16px;
  color: #00F
  text-decoration: none;
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
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
      }
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <button to={item.path} key={index} className='DropdownLink'>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </button>
          );
        })}
    </>
  );
};

export default SubMenu;
