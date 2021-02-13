import React, {Component } from 'react';
import NavBarInstance from '../../Elements/Navbar/Navbar2';
//import './Home.css';
import Home_img from '../../../Imagenes/Home/Home.jpg'

class Home extends Component{

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
          activeKey: null
        };
      }
      handleSelect(eventKey) {
        this.setState({
          activeKey: eventKey
        });
      }
      render() {
        const { activeKey } = this.state;
        //<img src={Home_img} className='portadaImagen'  alt="Portada"/>
        return (
          <div>
            <NavBarInstance activeKey={activeKey} onSelect={this.handleSelect} />
          </div>
        );
      }
}


export default Home;
