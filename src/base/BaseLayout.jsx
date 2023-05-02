import React from "react";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div className={"text-center"}>
      <main style={{ marginBottom: "60px" }}>
        <Outlet />
      </main>
      <footer className="fixed-bottom">
        © 2022 Copyright: Siete de Oro S.R.L. Av. 9 de Julio 431, CP 1262,
        Microcentro, CABA
      </footer>
    </div>
  );
};
