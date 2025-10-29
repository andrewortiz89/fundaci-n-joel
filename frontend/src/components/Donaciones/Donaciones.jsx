import React, { useState } from "react";
import { Row, Col } from "react-flexbox-grid";
import "./Donaciones.scss";
import emailjs from "emailjs-com";
import { useRef } from "react";
import { useTranslation } from "../../contexts/LanguageContext";
import Title from "../ui-components/title/title";
import ContactInfo from "./contactInfo/contactInfo";
import ContactSocial from "./contactInfo/contactSocial";
import Modal from "../contact-modal/Modal";
import DonateButton from "./Donate";

// Imágenes
import BannerBackground from "../../assets/Donaciones/bg.jpg";
import ContactBackground from "../../assets/Donaciones/21.jpg";

const Donaciones = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: false });

    const SERVICE_ID = "service_yw3qvqf";
    const TEMPLATE_ID = "template_gt1u9vg";
    const USER_ID = "xqE8eoAh7yFaJNBH9";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(() => {
        setStatus({ sending: false, success: true, error: false });
        setFormData({ nombre: "", email: "", mensaje: "" });
      })
      .catch(() => {
        setStatus({ sending: false, success: false, error: true });
      });
  };

  const closeModal = () =>
    setStatus({ sending: false, success: false, error: false });

  return (
    <section id="Donaciones" className="donaciones-section">
      {status.success && <Modal closeModal={closeModal} status="success" />}
      {status.error && <Modal closeModal={closeModal} status="error" />}

      <div className="wrapper">
        <Title title={t('donaciones.title')} />

        <p className="font12 text-center max-w-700 mx-auto">
          <span role="img" aria-label="corazón">{t('donaciones.intro.donate.icon')}</span>{' '}
          <b>{t('donaciones.intro.donate.title')}</b> {t('donaciones.intro.donate.text')}
          <br />
          <span role="img" aria-label="alabanza">{t('donaciones.intro.volunteer.icon')}</span>{' '}
          <b>{t('donaciones.intro.volunteer.title')}</b> {t('donaciones.intro.volunteer.text')}
          <br />
          <span role="img" aria-label="megáfono">{t('donaciones.intro.share.icon')}</span>{' '}
          <b>{t('donaciones.intro.share.title')}</b> {t('donaciones.intro.share.text')}
          <br />
          {t('donaciones.intro.closing')}
        </p>

        {/* Banner */}
        <div className="donar-banner">
          <img
            src={BannerBackground}
            alt={t('donaciones.banner.alt')}
            className="donar-banner__img"
          />
          <div className="donar-banner__overlay">
            <h2>{t('donaciones.banner.title')}</h2>
            <p>{t('donaciones.banner.subtitle')}</p>
            <DonateButton />
          </div>
        </div>

        <Row className="padding40">
          <Col md={12} lg={6}>
            <form
              ref={formRef}
              id="donaciones-form"
              onSubmit={handleSubmit}
              className="donaciones-form"
            >
              <h4 className="font30 weight800 padding30 text-center">
                {t('donaciones.form.title')}
              </h4>

              <input
                type="text"
                placeholder={t('donaciones.form.name')}
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder={t('donaciones.form.email')}
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <textarea
                rows="5"
                placeholder={t('donaciones.form.message')}
                name="mensaje"
                required
                value={formData.mensaje}
                onChange={handleChange}
              ></textarea>

              <div className="small__button">
                <button type="submit" disabled={status.sending}>
                  {status.sending ? t('donaciones.form.sending') : t('donaciones.form.send')}
                </button>
              </div>
            </form>
          </Col>

          <Col md={12} lg={6} className="flex-center">
            <img
              src={ContactBackground}
              alt={t('donaciones.banner.alt')}
              className="donaciones-img"
            />
          </Col>
        </Row>

        <ContactInfo />
        <ContactSocial />
      </div>
    </section>
  );
};

export default Donaciones;