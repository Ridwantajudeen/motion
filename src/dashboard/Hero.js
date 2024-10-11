import React from 'react';
import bowl from './images/drink.png'
import bike from './images/fast-delivery.png'
import fast from './images/food-delivery.png'
import call from './images/help-call.png'
import range from './images/distance.png'
import pay from './images/cashless-payment.png'

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
                 your restaurant and catering with us. Give people the opportunity to taste your delicacy 
                </p><br />
                <a href='/#'>Register now </a>

            </div>
            <div className='card'>
                <img src={bike} className='bike' alt=''/>
                <p className='restaurant'>Earn extra income on motion as you deliver food to our customers. Register with us now and get paid every time you make a delivery. 
                </p><br />
                <a href='/#'>Register now </a>

            </div>
            </div>
            <div className="slider-container">
      <div className="sliding-text">
        <div>
            <img src={fast} className='slide-img' alt=''/>
            Fastest Delivery</div>
        <div>
        <img src={call} className='slide-img' alt=''/>24/7 Customer Support</div>
        <div>
        <img src={range} className='slide-img' alt=''/>Wide Range Delivery</div>
        <div>
        <img src={pay} className='slide-img' alt=''/>Multiple Payment Options</div>
        
      </div>
    </div>
        </div>
    )
}

export default Hero;
