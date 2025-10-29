import React from "react";
import { Link } from "react-scroll";
import { useTranslation } from "../../contexts/LanguageContext";
// SCSS
import "./navbar.scss";
// Assets
import CloseIcons from "../../assets/navbar/mobile-close.svg";
import Logo from "../../assets/navbar/logof.png";

const MobileNav = (props) => {
  const { language, setLanguage, t } = useTranslation(); // Agregado para manejar el selector

  const languages = [
    { code: "es", flag: "🇪🇸", name: "ES" },
    { code: "en", flag: "🇺🇸", name: "EN" },
    { code: "pt", flag: "🇧🇷", name: "PT" },
  ];

  return (
    <div className={`mobile__navbar ${props.isOpen ? "mobile__open" : ""}`}>
      <div className="mobile__navbar-close" onClick={props.closeMobileMenu}>
        <img src={CloseIcons} alt="close" />
      </div>

      <div className="mobile__navbar-logo flex-center">
        <Link
          to="inicio"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          onClick={props.closeMobileMenu}
        >
          <img src={Logo} alt="logo" />
        </Link>
      </div>

      <div className="mobile__navbar-menu">
        <ul>
          <li className="flex-center">
            <Link
              activeClass="active-link"
              to="Galeria"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={props.closeMobileMenu}
            >
              {t("navbar.galeria")}
            </Link>
          </li>
          <li className="flex-center">
            <Link
              activeClass="active-link"
              to="Quienes"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={props.closeMobileMenu}
            >
              {t("navbar.nosotros")}
            </Link>
          </li>
          <li className="flex-center">
            <Link
              activeClass="active-link"
              to="programas"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={props.closeMobileMenu}
            >
              {t("navbar.programas")}
            </Link>
          </li>
          <li className="flex-center">
            <Link
              activeClass="active-link"
              to="Donaciones"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={props.closeMobileMenu}
            >
              {t("navbar.donaciones")}
            </Link>
          </li>
          {/* NUEVO: SELECTOR DE IDIOMA EN MÓVIL */}
          <li className="flex-center navbar__language-selector-mobile">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)} // Cambia el idioma
                className={`lang-btn ${language === lang.code ? "active" : ""}`}
                title={lang.name}
              >
                <span className="lang-flag">{lang.flag}</span>
              </button>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
