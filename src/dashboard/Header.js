import React from 'react'
import logo from './images/motion-logo.png'
import burger from './images/burger1.JPG'
function Header(){
    return(
        <div className='Header'
        style={{
            backgroundImage: `url(${burger})`,
            backgroundSize: 'cover',
            height: '400px'
        }}
        >
            <div className='head'>
            <img src={logo} className='logo' alt='logo' />
            <button>Login</button>
            </div>
            <div className='location'>
                <h3>Where do you want us to deliver to?</h3>
                <input type='text' placeholder='ENTER YOUR ADDRESS HERE'/><br />
                <button>SEARCH</button>
            </div>
        </div>
    )
}

export default Header;