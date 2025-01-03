import React, { useState } from 'react';

export default function SideBoard({children}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBoard = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <button className="hamburger" onClick={toggleSideBoard}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>

      <div className={`sideboard ${isOpen ? 'open' : ''}`}>
        <div className="options">{children}</div>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSideBoard}></div>}
    </>
  )
}
