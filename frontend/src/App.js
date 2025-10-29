import React from "react";
import "./style/App.scss";

// Components
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector/LanguageSelector'; // ⭐ Sin destructuring
import DesktopNav from "./components/navbar/desktop-nav";
import MobileNav from "./components/navbar/mobile-nav";
import Backdrop from "./components/navbar/backdrop";
import Inicio from "./components/Inicio/Inicio";
import Galeria from "./components/Galeria/Galeria";
import Partners from "./components/slider/partners";
import Donaciones from "./components/Donaciones/Donaciones";
import Footer from "./components/footer/footer";
import Quienes from "./components/Quienes/Quienes";
import Programas from "./components/Programas/Programas";


class App extends React.Component {
  state = {
    userIsScrolled: false,
    mobileNavbarOpen: false,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.userIsScrolled);
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.userIsScrolled);
  }

  // Detect if user is scrolled down (used for add/disable extra large navbar)
  userIsScrolled = () => {
    if (window.pageYOffset > 80) {
      this.setState({ userIsScrolled: true });
    } else {
      this.setState({ userIsScrolled: false });
    }
  };
  
  // On closeMobileMenu click close navbar
  closeMobileMenu = () => {
    this.setState({ mobileNavbarOpen: false });
  };
  
  // Mobile menu handler
  mobileMenuOpen = () => {
    this.setState({ mobileNavbarOpen: true });
  };

  render() {
    // BACKDROP RENDER
    let backdrop = <Backdrop closeMobileMenu={this.closeMobileMenu} />;
    if (this.state.mobileNavbarOpen) {
      backdrop = (
        <Backdrop closeMobileMenu={this.closeMobileMenu} isOpen={true} />
      );
    }
    
    // MOBILE NAVBAR RENDER
    let mobileNavbar = <MobileNav />;
    if (this.state.mobileNavbarOpen) {
      mobileNavbar = (
        <MobileNav isOpen={true} closeMobileMenu={this.closeMobileMenu} />
      );
    }

    return (
      <div className="App">
        {mobileNavbar}
        {backdrop}
        
        {/* ⭐ Selector de idiomas flotante (solo móvil) */}
        <LanguageSelector />
        
        <DesktopNav
          userIsScrolled={this.state.userIsScrolled}
          mobileMenuOpen={this.mobileMenuOpen}
        />
        
        <Inicio />
        <Galeria />
        <Partners />
        <Quienes />
        <Programas />
        <Donaciones />
        <Footer />
      </div>
    );
  }
}

// ⭐ Envolver el componente con el Provider FUERA de la clase
function AppWithProvider() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

export default AppWithProvider;