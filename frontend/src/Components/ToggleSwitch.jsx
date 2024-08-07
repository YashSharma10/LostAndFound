import React, { useState, useEffect } from 'react';
import './switch.css';

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (isChecked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isChecked]);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='Switch'>
      <input 
        type="checkbox" 
        className="checkbox" 
        id="checkbox" 
        checked={isChecked} 
        onChange={handleChange} 
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
        <span className="balldark"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
