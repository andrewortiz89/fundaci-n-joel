import React from 'react';
import { Link } from "react-scroll";
import { useTranslation } from '../../contexts/LanguageContext';
// SCSS
import './navbar.scss';
// Assets
import LogoImg from '../../assets/navbar/logo2.png';
import MobileMenuIcon from '../../assets/navbar/mobile-menu.svg';

const DesktopNav = (props) => {
  const { language, setLanguage, t } = useTranslation();
  
  const languages = [
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
  ];

  return (
    <nav className={`Navbar ${!props.userIsScrolled ? "extraLargeNavbar" : ""}`}>
      <div className="wrapper flex-s-between">
        {/* LOGO */}
        <div>
          <Link to="inicio" spy={true} smooth={true} offset={0} duration={500}>
            <img src={LogoImg} alt="logo" className="pointer navbar__logo" />
          </Link>
        </div>

        {/* MOBILE MENU ICON */}
        <div className="mobile__menu" onClick={props.mobileMenuOpen}>
          <img src={MobileMenuIcon} alt="menu" />
        </div>

        {/* DESKTOP MENU */}
        <div className="desktop__menu">
          <ul className="flex-s-between">
            <li>
              <Link activeClass="active-link" to="inicio" spy={true} smooth={true} offset={-70} duration={500}>
                {t('navbar.inicio') || 'INICIO'}
              </Link>
            </li>

            <li>
              <Link activeClass="active-link" to="Galeria" spy={true} smooth={true} offset={-70} duration={500}>
                {t('navbar.galeria') || 'GALERIA'}
              </Link>
            </li>

            <li>
              <Link activeClass="active-link" to="Quienes" spy={true} smooth={true} offset={-70} duration={500}>
                {t('navbar.nosotros') || 'NOSOTROS'}
              </Link>
            </li>

            <li>
              <Link activeClass="active-link" to="programas" spy={true} smooth={true} offset={-70} duration={500}>
                {t('navbar.programas') || 'PROGRAMAS'}
              </Link>
            </li>

            <li>
              <Link activeClass="active-link" to="Donaciones" spy={true} smooth={true} offset={-70} duration={500}>
                {t('navbar.donaciones') || 'DONACIONES'}
              </Link>
            </li>

            {/* SELECTOR DE IDIOMA INTEGRADO EN EL MENÚ */}
            <li className="navbar__language-selector">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                  title={lang.name}
                >
                  <span className="lang-flag">{lang.flag}</span>
                </button>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;