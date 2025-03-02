'use client';

import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

const Menu = () => {
  const { menuOpen, setMenuOpen } = useContext(MenuContext);

  return (
    <div>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
      </button>
    </div>
  );
};

export { MenuProvider, Menu };
