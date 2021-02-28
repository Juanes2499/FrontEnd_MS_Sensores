import React,{useState} from 'react'
import { Sidenav, Nav, Icon, Dropdown } from 'rsuite';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import './Sidebar.css'

const SidebarLabel = styled.span`
    font-family: 'Arial';
    font-size: 100%;
    color: rgb(85, 85, 85);
`;

const LabelSubNav = styled.span`
    font-family: 'Arial';
    color: rgb(85, 85, 85);
`;

const Sidemenu2 = ({show, dataMenu}) => {

    const [activeKey, setActiveKey] = useState(1)

    const handleSelect = (eventKey) =>{
        setActiveKey(eventKey)
    };
    
    const history = useHistory()
    
    return (
        <div style={{ width: 400,zIndex:999, position:'absolute', backgroundColor:'white'}}>
            <Sidenav
                expanded={show}
                activeKey={activeKey}
                onSelect={handleSelect}
            >
                <Sidenav.Body>
                    <Nav>
                        {
                            dataMenu.map((item,index) => {
                                return(
                                    <Dropdown
                                        key={index}
                                        placement="rightStart"
                                        eventKey={item.orden}
                                        title={<SidebarLabel>{item.title}</SidebarLabel>}
                                        icon={<Icon icon={item.icon} />}
                                    >
                                        {
                                            item.subNav.map((itemSubNav, indexSubNav) => {
                                                return(
                                                    <Dropdown.Item 
                                                        key={indexSubNav}
                                                        onSelect={() => history.push(`${itemSubNav.path}`)} 
                                                        eventKey={`${item.orden}-${itemSubNav.orden}`}
                                                    >
                                                        <i className={`${itemSubNav.icon}`} style={{marginRight:'10%'}}/>
                                                        <LabelSubNav>{itemSubNav.title}</LabelSubNav>
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown>
                                )
                            })
                        }
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
}

export default Sidemenu2;
