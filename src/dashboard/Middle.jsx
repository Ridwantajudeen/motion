import React, { useState } from 'react';

function Middle() {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = () => {
    const textToCopy = "firstTimer210";
    
    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess('Copied!');
    }).catch(err => {
      setCopySuccess('Failed to copy');
    });
  };

  return (
    <div className='middle'
    style={{
        display: 'grid',
        placeItems: 'center',
       
      }}>
        <div id='middle'>
    <h2>Enjoy our discount on your first order</h2>
    <p>Click the button below to copy your coupon code and paste at the point of checkout</p>

    <div>
      {/* The text that will be copied when clicked */}
      <button onClick={handleCopy} style={{
       marginTop:'5px'
       
      }}>
        Cupon Code
      </button>

      {/* Display success or failure message */}
      {copySuccess && <p>{copySuccess}</p>}
    </div>
    <p style={{
       marginTop:'5px'
       
      }}>Enjoy 15% off your first delivery fee. Ball on us😘</p>
    </div>
    </div>
  );
}

export default Middle;
