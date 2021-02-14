import React from 'react'
import Button from '../Button/Button';
import './HeroSection.css';

const  HeroSection = ({
    type,
    srcVideo,
    srcImg,
    tittle,
    subtitulo,
    buttonPosition,
    buttonsCaption,
    buttonsTo,
    buttonsStyles,
    buttonsSize
}) => {
    console.log(type)
    return (
        <div className='hero-container'>
            {
                type === 'video' ?  <video src={srcVideo} autoPlay loop muted /> : <img src={srcImg} alt="Portada"/>
            }    
            <h1>{tittle}</h1>
            <p>{subtitulo}</p>
            <div className='hero-btns'>
                {
                    buttonPosition.map(x => {
                        return (
                                /*Es necesario establece key para poder hacer un map de un array*/
                                <Button 
                                    key={x.toString()} 
                                    className = 'btns'
                                    buttonStyle = {`${buttonsStyles[x]}`}
                                    buttonSize = {`${buttonsSize[x]}`}
                                    to = {`${buttonsTo[x]}`}
                                >
                                    {buttonsCaption[x]}
                                </Button>
                            
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HeroSection
