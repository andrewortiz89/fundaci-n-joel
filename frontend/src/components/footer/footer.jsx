import React from "react";


import "./footer.scss";

import Logo from "../../assets/footer/logo.png"; 


const Footer = () => ( 
  <div className="footer">
    <div className="wrapper">
      {/* Contenedor del logo */}
      <div className="footer__logo-container">
        <img src={Logo} alt="logo" className="footer__logo" />
      </div>

      {/* Contenedor del texto de copyright y disclaimer */}
      <div className="footer__text-content">
        <p>© 2025 Fundación Joel. Todos los derechos reservados.</p>
      </div>

      {/* Contenedor de los enlaces del footer */}
      

    </div>
  </div>
);
export default Footer; 
