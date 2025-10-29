import React from "react";
import Swiper from "react-id-swiper";
import { useTranslation } from "../../contexts/LanguageContext";
// SCSS
import "./Programas.scss";
import "swiper/css/swiper.css";
// Assets
import Preview01 from "../../assets/Programas/story01/preview.jpg";
import Preview02 from "../../assets/Programas/story02/preview.jpg";
import Preview03 from "../../assets/Programas/story03/preview.jpg";
import Preview04 from "../../assets/Programas/story04/preview.jpg";
import Preview05 from "../../assets/Programas/story05/preview.jpg";
import Preview06 from "../../assets/Programas/story06/preview.jpg";
// Components
import Title from "../ui-components/title/title";
import BlogBox from "./blogBox";

// Wrapper funcional para usar hooks
const ProgramasWrapper = () => {
  const { t } = useTranslation();
  return <Programas t={t} />;
};

class Programas extends React.Component {
  getStories = () => {
    const { t } = this.props;
    return [
      {
        image: Preview01,
        id: "1",
        title: t('programas.programs.art.title'),
        description: t('programas.programs.art.description'),
      },
      {
        image: Preview02,
        id: "2",
        title: t('programas.programs.sports.title'),
        description: t('programas.programs.sports.description'),
      },
      {
        image: Preview03,
        id: "3",
        title: t('programas.programs.education.title'),
        description: t('programas.programs.education.description'),
      },
      {
        image: Preview04,
        id: "4",
        title: t('programas.programs.celebrations.title'),
        description: t('programas.programs.celebrations.description'),
      },
      {
        image: Preview05,
        id: "5",
        title: t('programas.programs.prayer.title'),
        description: t('programas.programs.prayer.description'),
      },
      {
        image: Preview06,
        id: "6",
        title: t('programas.programs.community.title'),
        description: t('programas.programs.community.description'),
      },
    ];
  };

  render() {
    const { t } = this.props;
    const stories = this.getStories();
    
    const storiesRender = stories.map((story) => (
      <div key={story.id}>
        <BlogBox article={story} />
      </div>
    ));

    // OPTIONS FOR BLOG SLIDER
    const params = {
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      breakpoints: {
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    };

    return (
      <div className="programas" id="programas">
        <div className="wrapper">
          <Title title={t('programas.title')} />
          <p className="font12">
            {t('programas.quote1')}<br />
            {t('programas.quote2')}
          </p>
          <div className="padding30">
            <Swiper {...params}>{storiesRender}</Swiper>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgramasWrapper;