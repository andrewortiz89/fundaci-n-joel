import React, { useEffect, useRef, useState } from "react";
import "./Inicio.scss";
import video1 from "../../assets/Inicio/video1.mp4";
import { useTranslation } from "../../contexts/LanguageContext";

import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/nunito/900.css";

const Inicio = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const safePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  /* Detecta orientación del video al cargar */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      setIsVertical(v.videoHeight > v.videoWidth);
      if (v.muted) safePlay();
    };
    v.addEventListener("loadedmetadata", onLoaded);
    return () => v.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  /* Actualiza barra de progreso y estado del reproductor */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => {
      if (!progressRef.current || !v.duration) return;
      progressRef.current.style.width = `${
        (v.currentTime / v.duration) * 100
      }%`;
    };
    const onEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
      if (progressRef.current) progressRef.current.style.width = "0%";
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  /* Animación al entrar en pantalla */
  useEffect(() => {
    const section = document.getElementById("inicio");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      await safePlay();
      setShowControls(false);
    } else {
      v.pause();
      setShowControls(true);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (v.muted && v.paused) safePlay();
  };

  const handleProgressClick = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleVideoPointer = () => {
    setShowControls(true);
    setTimeout(() => {
      if (!videoRef.current?.paused) setShowControls(false);
    }, 3000);
  };

  return (
    <section className="inicio" id="inicio">
      <div className="inicio-container">
        {/* TEXTO PRINCIPAL */}
        <div className={`inicio-content ${isVisible ? "visible" : ""}`}>
          <h1 className="inicio-title">
            <span className="welcome">{t("inicio.welcome.text")}</span>

            <span className="foundation">
              {t("inicio.welcome.foundation")}{" "}
              <span className="highlight">{t("inicio.welcome.joel")}</span>
            </span>
          </h1>

          <h2 className="inicio-subtitle">
            {t("inicio.subtitle")}
            <span className="subtitle-icon" aria-hidden="true">
              {" "}
              {t("inicio.icon")}
            </span>
          </h2>

          <div className="inicio-buttons">
            <a href="#Donaciones" className="inicio-button primary">
              {t("inicio.cta.donate")}
            </a>
            <a href="#Quienes" className="inicio-button secondary">
              {t("inicio.cta.learn")}
            </a>
          </div>

          <p className="inicio-description">{t("inicio.description")}</p>
        </div>

        {/* VIDEO LATERAL */}
        <div className={`inicio-video-wrapper ${isVisible ? "visible" : ""}`}>
          <div className="inicio-video-container">
            <video
              ref={videoRef}
              className={`inicio-video ${
                isVertical ? "vertical" : "horizontal"
              }`}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onClick={handleVideoPointer}
              onMouseMove={handleVideoPointer}
            >
              <source src={video1} type="video/mp4" />
              {t("inicio.video.noSupport")}
            </video>

            {/* CONTROLES */}
            <div
              className={`inicio-video-controls ${
                showControls ? "" : "hidden"
              }`}
            >
              <button className="inicio-play-button" onClick={togglePlay}>
                {isPlaying ? "⏸️" : "▶️"}
              </button>

              <button
                className={`inicio-sound-button ${isMuted ? "muted" : ""}`}
                onClick={toggleMute}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>

            {/* PROGRESO */}
            <div
              className="inicio-video-progress"
              onClick={handleProgressClick}
            >
              <div className="progress-bar" ref={progressRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
