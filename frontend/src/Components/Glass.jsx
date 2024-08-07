import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';
import './glass.css';
import '../App.css';

function Glass({ title, subtitle, imageSrc, to }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // Initialize VanillaTilt
    VanillaTilt.init(card, {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
    });

    // Mousemove effect
    const handleMouseMove = (e) => {
      let x = e.pageX - window.innerWidth / 2;
      let y = e.pageY - window.innerHeight / 2;
      card.style.transform = `translate(${x / 40}px, ${y / 40}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="glass-container">
        <div className="cardContainer">
          <Link to={to} className="cardLink">
            <div ref={cardRef} className="card-glass">
              <div className="text-card">
                <h1 className="content-glass">{title}</h1>
                <h3 className="content-glass">{subtitle}</h3>
              </div>
              <img className='glass-photo' width="100" height="100" src={imageSrc} alt={title} />
            </div>
          </Link>
        </div>
        <div className="balls">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
          <div className="ball ball3"></div>
        </div>
      </div>
    </>
  );
}

export default Glass;
