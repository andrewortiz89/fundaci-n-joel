import React from "react";
import { Row, Col } from "react-flexbox-grid";
import Masonry from "react-masonry-css";
import { useTranslation } from "../../contexts/LanguageContext";
//Scss
import "./Galeria.scss";
//Assets
import Arrow from "../../assets/Galeria/arrow.svg";
import Preview1 from "../../assets/Galeria/project01/preview.jpg";
import Preview2 from "../../assets/Galeria/project02/preview.jpg";
import Preview3 from "../../assets/Galeria/project03/preview.jpg";
import Preview4 from "../../assets/Galeria/project04/preview.jpg";
import Preview5 from "../../assets/Galeria/project05/preview.jpg";
import Preview6 from "../../assets/Galeria/project06/preview.jpg";
//Components
import Button from "../ui-components/button/button";
import Title from "../ui-components/title/title";
import ProjectBox from "../ui-components/projectBox/projectBox";

// Wrapper funcional para usar hooks
const GaleriaWrapper = () => {
  const { t } = useTranslation();
  return <Galeria t={t} />;
};

class Galeria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // CONTENIDO DE LA GALERÍA - IMÁGENES
      images: [
        {
          id: "img1",
          preview: Preview1,
          titleKey: "galeria.images.community",
          tag: "eventos",
          type: "image",
        },
        {
          id: "img2",
          preview: Preview2,
          titleKey: "galeria.images.donation",
          tag: "donaciones",
          type: "image",
        },
        {
          id: "img3",
          preview: Preview3,
          titleKey: "galeria.images.education",
          tag: "educacion",
          type: "image",
        },
        {
          id: "img4",
          preview: Preview4,
          titleKey: "galeria.images.volunteer",
          tag: "voluntarios",
          type: "image",
        },
        {
          id: "img5",
          preview: Preview5,
          titleKey: "galeria.images.health",
          tag: "salud",
          type: "image",
        },
        {
          id: "img6",
          preview: Preview6,
          titleKey: "galeria.images.training",
          tag: "educacion",
          type: "image",
        },
      ],
      // CONTENIDO DE LA GALERÍA - VIDEOS LOCALES
      videos: [
        {
          id: "vid1",
          videoUrl: "/videos/video1.mp4",
          titleKey: "galeria.videos.testimony1",
          tag: "testimonios",
          type: "video",
        },
        {
          id: "vid2",
          videoUrl: "/videos/video2.mp4",
          titleKey: "galeria.videos.charity",
          tag: "campanas",
          type: "video",
        },
        {
          id: "vid3",
          videoUrl: "/videos/video3.mp4",
          titleKey: "galeria.videos.campaign",
          tag: "eventos",
          type: "video",
        },
        {
          id: "vid4",
          videoUrl: "/videos/video4.mp4",
          titleKey: "galeria.videos.recreation",
          tag: "recreacion",
          type: "video",
        },
      ],
      // ESTADO DE LA GALERÍA
      filterResult: null,
      pickedFilter: "all",
      activeTab: "images",
      filterMenuActive: false,
      pickedFilterDropdown: "NEWEST",
      loadingVideos: {},
    };
  }

  // Mapeo de tags a claves de traducción
  getTagTranslation = (tag) => {
    const { t } = this.props;
    const tagMap = {
      eventos: t('galeria.tags.eventos'),
      donaciones: t('galeria.tags.donaciones'),
      educacion: t('galeria.tags.educacion'),
      voluntarios: t('galeria.tags.voluntarios'),
      salud: t('galeria.tags.salud'),
      testimonios: t('galeria.tags.testimonios'),
      campanas: t('galeria.tags.campanas'),
      recreacion: t('galeria.tags.recreacion'),
    };
    return tagMap[tag] || tag;
  };

  componentDidMount() {
    this.switchTab("images");
  }

  switchTab = (tab) => {
    this.setState({ activeTab: tab }, () => {
      this.filterGallery("all");
    });
  };

  getCurrentContent = () => {
    return this.state.activeTab === "images"
      ? this.state.images
      : this.state.videos;
  };

  getAvailableFilters = () => {
    const currentContent = this.getCurrentContent();
    const tags = [...new Set(currentContent.map((item) => item.tag))];
    return tags;
  };

  filterGallery = (target) => {
    let contentArr = [...this.getCurrentContent()];
    let result;

    if (target !== "all") {
      result = contentArr.filter((item) => item.tag === target);
    } else {
      result = contentArr;
    }

    this.setState({
      filterResult: result,
      pickedFilter: target,
      pickedFilterDropdown: "NEWEST",
    });
  };

  filterMenuHover = (event) => {
    if (event) {
      this.setState({ filterMenuActive: true });
    } else {
      this.setState({ filterMenuActive: false });
    }
  };

  filterDropDownHandler = (filter) => {
    this.setState({ pickedFilterDropdown: filter, filterMenuActive: false });

    let contentArr = [...this.state.filterResult];
    let result;

    if (filter === "NEWEST") {
      result = contentArr.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else if (filter === "OLDEST") {
      result = contentArr.sort((a, b) => (a.id > b.id ? 1 : -1)).reverse();
    }

    this.setState({ filterResult: result });
  };

  handleVideoError = (e, videoTitle, videoUrl) => {
    console.error(`❌ Error cargando video "${videoTitle}":`, e.target.error);
    console.log("🔍 URL del video:", videoUrl);

    e.target.style.display = "none";
    const container = e.target.parentElement;
    if (container) {
      const errorMsg = container.querySelector(".video-error");
      if (errorMsg) {
        errorMsg.style.display = "flex";
      }
    }
  };

  handleVideoLoadStart = (videoId) => {
    this.setState((prevState) => ({
      loadingVideos: {
        ...prevState.loadingVideos,
        [videoId]: true,
      },
    }));
  };

  handleVideoLoaded = (videoId, videoTitle) => {
    this.setState((prevState) => ({
      loadingVideos: {
        ...prevState.loadingVideos,
        [videoId]: false,
      },
    }));
    console.log(`✅ Video "${videoTitle}" cargado correctamente`);
  };

  getVideoPlaceholder = (index) => {
    const placeholders = [
      Preview1,
      Preview2,
      Preview3,
      Preview4,
      Preview5,
      Preview6,
    ];
    return placeholders[index % placeholders.length];
  };

  generateVideoSources = (videoUrl) => {
    if (!videoUrl || typeof videoUrl !== "string") {
      return [];
    }

    const sources = [{ src: videoUrl, type: "video/mp4" }];

    if (videoUrl.includes(".mp4")) {
      sources.push(
        { src: videoUrl.replace(".mp4", ".webm"), type: "video/webm" },
        { src: videoUrl.replace(".mp4", ".ogg"), type: "video/ogg" }
      );
    }

    return sources;
  };

  isValidVideoItem = (item) => {
    return (
      item &&
      item.videoUrl &&
      typeof item.videoUrl === "string" &&
      item.videoUrl.trim() !== "" &&
      item.titleKey &&
      item.tag
    );
  };

  render() {
    const { t } = this.props;
    
    let contentRender = null;
    if (this.state.filterResult) {
      contentRender = this.state.filterResult
        .map((item, index) => {
          if (!item || !item.id) {
            console.warn("Item inválido encontrado:", item);
            return null;
          }

          if (this.state.activeTab === "images") {
            return (
              <ProjectBox
                preview={item.preview}
                key={item.id}
                title={t(item.titleKey)}
                tag={this.getTagTranslation(item.tag)}
              />
            );
          } else {
            if (!this.isValidVideoItem(item)) {
              console.warn("Item de video inválido:", item);
              return (
                <div key={item.id} className="video-box">
                  <div className="video-container">
                    <div
                      className="video-error"
                      style={{
                        display: "flex",
                        position: "relative",
                        height: "300px",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                        padding: "20px",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                        <span role="img" aria-label="error">❌</span>
                      </div>
                      <h4>{t('galeria.errors.invalidVideo')}</h4>
                      <p style={{ fontSize: "14px", opacity: 0.8 }}>
                        {t('galeria.errors.invalidConfig')}
                      </p>
                    </div>
                  </div>
                  <div className="video-info">
                    <h4>{item.titleKey ? t(item.titleKey) : t('galeria.errors.noTitle')}</h4>
                    <span className="tag">{this.getTagTranslation(item.tag)}</span>
                  </div>
                </div>
              );
            }

            const videoSources = this.generateVideoSources(item.videoUrl);
            const translatedTitle = t(item.titleKey);

            return (
              <div key={item.id} className="video-box">
                <div className="video-container">
                  <video
                    controls
                    preload="metadata"
                    poster={this.getVideoPlaceholder(index)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "12px 12px 0 0",
                      backgroundColor: "#000",
                    }}
                    onError={(e) =>
                      this.handleVideoError(e, translatedTitle, item.videoUrl)
                    }
                    onLoadedMetadata={() => {
                      this.handleVideoLoaded(item.id, translatedTitle);
                    }}
                    onLoadStart={() => this.handleVideoLoadStart(item.id)}
                    className={
                      this.state.loadingVideos[item.id] ? "video-loading" : ""
                    }
                    title={translatedTitle}
                  >
                    {videoSources.map((source, sourceIndex) => (
                      <source
                        key={sourceIndex}
                        src={source.src}
                        type={source.type}
                      />
                    ))}
                    {t('galeria.errors.noSupport')}
                    <p>
                      {t('galeria.errors.downloadText')}{" "}
                      <a href={item.videoUrl} download>
                        {t('galeria.errors.downloadLink')}
                      </a>{" "}
                      {t('galeria.errors.instead')}
                    </p>
                  </video>

                  <div
                    className="video-error"
                    style={{
                      display: "none",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      padding: "20px",
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                      <span role="img" aria-label="warning">⚠️</span>
                    </div>
                    <h4>{t('galeria.errors.loadError')}</h4>
                    <p style={{ fontSize: "14px", opacity: 0.8 }}>
                      {t('galeria.errors.checkFile')}
                    </p>
                  </div>

                  {this.state.loadingVideos[item.id] && (
                    <div className="video-loading-indicator">
                      <div className="spinner"></div>
                      <p>{t('galeria.loading')}</p>
                    </div>
                  )}
                </div>
                <div className="video-info">
                  <h4>{translatedTitle}</h4>
                  <span className="tag">{this.getTagTranslation(item.tag)}</span>
                </div>
              </div>
            );
          }
        })
        .filter(Boolean);
    }

    const galleryBreakpoints = {
      default: this.state.activeTab === "images" ? 3 : 2,
      1100: this.state.activeTab === "images" ? 3 : 2,
      700: 2,
      500: 1,
    };

    const availableFilters = this.getAvailableFilters();

    let filterDroppDown = null;
    if (this.state.filterMenuActive) {
      filterDroppDown = (
        <div className="Galeria__filter-menu shadow">
          <p
            className="font12"
            onClick={() => this.filterDropDownHandler("NEWEST")}
          >
            {t('galeria.filters.newest')}
          </p>
          <p
            className="font12"
            onClick={() => this.filterDropDownHandler("OLDEST")}
          >
            {t('galeria.filters.oldest')}
          </p>
        </div>
      );
    }

    return (
      <div id="Galeria">
        <div className="wrapper">
          <Title title={t('galeria.title')} />

          {/* PESTAÑAS PRINCIPALES */}
          <Row>
            <Col xs={12}>
              <div className="Galeria__tabs">
                <button
                  className={
                    this.state.activeTab === "images" ? "tab-active" : ""
                  }
                  onClick={() => this.switchTab("images")}
                >
                  {t('galeria.tabs.images')}
                </button>
                <button
                  className={
                    this.state.activeTab === "videos" ? "tab-active" : ""
                  }
                  onClick={() => this.switchTab("videos")}
                >
                  {t('galeria.tabs.videos')}
                </button>
              </div>
            </Col>
          </Row>

          {/* FILTROS Y CONTROLES */}
          <Row>
            <Col xs={12} sm={12} md={8} lg={9}>
              <div className="Galeria__nav">
                <ul>
                  <li
                    className={
                      this.state.pickedFilter === "all"
                        ? "Galeria__nav-active font12"
                        : "font12"
                    }
                    onClick={() => this.filterGallery("all")}
                  >
                    {t('galeria.filters.all')}
                  </li>
                  {availableFilters.map((filter) => (
                    <li
                      key={filter}
                      className={
                        this.state.pickedFilter === filter
                          ? "Galeria__nav-active font12"
                          : "font12"
                      }
                      onClick={() => this.filterGallery(filter)}
                    >
                      {this.getTagTranslation(filter)}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={3}>
              <div
                className="Galeria__filter"
                onMouseEnter={() => this.filterMenuHover(true)}
                onMouseLeave={() => this.filterMenuHover(false)}
              >
                <p className="font12">
                  {t(`galeria.filters.${this.state.pickedFilterDropdown.toLowerCase()}`)} {t('galeria.filters.first')}
                </p>
                <img src={Arrow} alt="arrow" />
                {filterDroppDown}
              </div>
            </Col>
          </Row>

          {/* GALERÍA */}
          <Masonry
            breakpointCols={galleryBreakpoints}
            className="my-masonry-grid"
            columnClassName="mint__gallery"
          >
            {contentRender}
          </Masonry>

          {/* BOTÓN DE CONTACTO */}
          <Row className="flex-center padding40">
            <Button label={t('galeria.cta.collaborate')} target={"Donaciones"} />
          </Row>
        </div>
      </div>
    );
  }
}

export default GaleriaWrapper;