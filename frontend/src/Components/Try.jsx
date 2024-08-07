import React, { useRef, useEffect, useCallback } from 'react';
import './Try.css';

import animation1 from '../Assets/1.gif';
import animation2 from '../Assets/2.gif';
import animation3 from '../Assets/3.gif';
import animation4 from '../Assets/4.gif';
import animation5 from '../Assets/5.gif';
import animation6 from '../Assets/6.gif';
import animation7 from '../Assets/7.gif';
import animation8 from '../Assets/8.gif';
import animation9 from '../Assets/9.gif';
import animation10 from '../Assets/10.gif';
import animation11 from '../Assets/11.gif';
import animation12 from '../Assets/12.gif';

const GifComponent = ({ className, animationData, index, elementsRef }) => {
  const handleMouseMove = useCallback((e) => {
    const element = elementsRef.current[index];
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 10;
      const y = (e.clientY - rect.top - rect.height / 2) / 10;
      element.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [index, elementsRef]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className={className} ref={(el) => (elementsRef.current[index] = el)}>
      <img src={animationData} alt={`Animation ${index}`} />
    </div>
  );
};

const Try = () => {
  const elementsRef = useRef([]);

  const gifs = [
    { className: 'animation1', animationData: animation1 },
    { className: 'animation2', animationData: animation2 },
    { className: 'animation3', animationData: animation3 },
    { className: 'animation4', animationData: animation4 },
    { className: 'animation5', animationData: animation5 },
    { className: 'animation6', animationData: animation6 },
    { className: 'animation7', animationData: animation7 },
    { className: 'animation8', animationData: animation8 },
    { className: 'animation9', animationData: animation9 },
    { className: 'animation10', animationData: animation10 },
    { className: 'animation11', animationData: animation11 },
    { className: 'animation12', animationData: animation12 },
  ];

  return (
    <div className='Homepagetry'>
      <h1 className='title'>LOST & FOUND</h1>
      {gifs.map((gif, index) => (
        <GifComponent
          key={index}
          className={gif.className}
          animationData={gif.animationData}
          index={index}
          elementsRef={elementsRef}
        />
      ))}
      <div className="grid-background-container">
        <div className="grid-background-overlay"></div>
      </div>
    </div>
  );
};

export default Try;
