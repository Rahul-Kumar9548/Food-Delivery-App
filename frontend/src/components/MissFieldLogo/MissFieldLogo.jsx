import React from 'react'
import './MissFieldLogo.css'

const MissFieldLogo = ({message}) => {
  return (
        <div class="tooltip">
            <div class="icon">!</div>
            <div class="tooltiptext"> {message} </div>
        </div>
		
  );
}

export default MissFieldLogo;