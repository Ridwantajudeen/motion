import React from 'react';
import bowl from './images/drink.png'
import bike from './images/fast-delivery.png'

function Hero(){
    return(
        <div id='hero'
        style={{
            display: 'grid',
            placeItems: 'center',
           
          }}>
        <div className='hero'
        style={{
            display: 'grid',
            placeItems: 'center',
           
          }}>
            <div className='card'>
                <img src={bowl} className='bowl' alt=''/>
                <p className='restaurant'>Take your food and pastries beyond boundaries by registering
                 your restaurant and catering with us. give people the opportunity to taste your delicacy 
                </p><br />
                <a href='/#'>Register now </a>

            </div>
            <div className='card'>
                <img src={bike} className='bike' alt=''/>
                <p className='restaurant'>Earn extra income on motion as you deliver food to our customers. register with us now and get paid every time you make a delivery. 
                </p><br />
                <a href='/#'>Register now </a>

            </div>
            </div>
        </div>
    )
}

export default Hero;
