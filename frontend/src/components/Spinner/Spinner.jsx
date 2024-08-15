import React from 'react'
import './Spinner.css'
const Spinner = ({className}) => {
  return (
		<>
			<div className={`dot-spinner ${className}`}>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
				<div className="dot-spinner__dot"></div>
			</div>
		</>
  );
}

export default Spinner