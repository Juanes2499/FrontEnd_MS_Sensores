import React, {Component } from 'react';
import Navbar from '../../Elements/Navbar/Navbar2';
import HeroSection from '../../Elements/HeroSection/HeroSection';
import videoHome from '../../../Videos/Home/HomeVideo.mp4';
import '../../../App.css';
import imageHome from '../../../Imagenes/Home/Home.jpg'

class Home extends Component{
  render() {
    return (
      <div>
        <Navbar/>
        <HeroSection 
          type = 'video'
          srcVideo={videoHome}
          srcImg = {imageHome}
          tittle='ResCity Platform'
          subtitulo='ResCity, una plataforma inteligente para un ciudad inteligente'
          buttonPosition={[/*0,1*/]}
          buttonsCaption={[/*'Aceca de nosotros', 'Nuestras plataformas'*/]}
          buttonsTo={[/*'/AboutUs', '/Platforms' */]}
          buttonsStyles={['btn--outline', 'btn--primary']}
          buttonsSize={['btn--large','btn--large']}
        />
      </div>
    );
  }
}


export default Home;
