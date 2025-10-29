import React from "react";
import { Row, Col } from "react-flexbox-grid";
import "./contactSocial.scss";

// --- IMPORTACIÓN DE ICONOS ---
import FacebookIcon from "../../../assets/Donaciones/facebook.svg";
import InstagramIcons from "../../../assets/Donaciones/instagram.svg";
// 🔹 NUEVO: Añade la importación del ícono de TikTok
import TikTokIcon from "../../../assets/Donaciones/tiktok2.svg"; // <-- Asegúrate de que el nombre del archivo (tiktok.svg) sea correcto

const contactSocial = () => (
  <Row>
    <Col xs={12}>
      <Row center="xs">
        {/* --- LINK DE FACEBOOK --- */}
        <Col xs={12} lg={1} className="contact__social">
          <a
            href="https://www.facebook.com/profile.php?id=61581825142181"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita nuestro Facebook"
          >
            <img src={FacebookIcon} alt="Facebook" />
          </a>
        </Col>

        {/* --- LINK DE INSTAGRAM --- */}
        <Col xs={12} lg={1} className="contact__social">
          <a
            href="https://www.instagram.com/fundajoel24"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita nuestro Instagram"
          >
            <img src={InstagramIcons} alt="Instagram" />
          </a>
        </Col>

        {/* --- 🔹 LINK DE TIKTOK --- */}
        <Col xs={12} lg={1} className="contact__social">
          <a
            href="https://www.tiktok.com/@fundacion.joel24"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita nuestro TikTok"
          >
            <img src={TikTokIcon} alt="TikTok" />
          </a>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default contactSocial;
