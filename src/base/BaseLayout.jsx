import React from "react";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div>
        <header>
            {/* Barra de navegación principal (ni usuario ni admin)*/}
        </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="text-center fixed-bottom">        
          © 2022 Copyright: Siete de Oro S.R.L. Av. 9 de Julio 431, CP 1262,
          Microcentro, CABA        
      </footer>
    </div>
  );
};
