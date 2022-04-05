import React from "react";
import './Hero.css'


const Hero = ({heading, imgurl}) => {
    const style = {
        backgroundImage: `url(${imgurl})`,
    }
    return <section className="Hero" style={style}>
        <div className="container" >
            <h2 className="heroHeading">{heading+' по лучшим ценам'}</h2>
        </div>
    </section>
}

export default Hero