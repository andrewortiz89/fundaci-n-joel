import React from "react";
import Swiper from "react-id-swiper";
// SCSS
import "swiper/css/swiper.css";
// Components
import PartnerBox from "./partnerBox";
// Assets
import Partner01 from "../../assets/Slider/partner01.png";
import Partner02 from "../../assets/Slider/partner02.png";
import Partner03 from "../../assets/Slider/partner03.png";
import Partner04 from "../../assets/Slider/partner04.png";
import Partner05 from "../../assets/Slider/partner05.png";
import Partner06 from "../../assets/Slider/partner06.png";

class MutipleSlidesPerView extends React.Component {
  state = {
    partners: [
      {
        preview: Partner01,
        id: "1",
      },
      {
        preview: Partner02,
        id: "2",
      },
      {
        preview: Partner03,
        id: "3",
      },
      {
        preview: Partner04,
        id: "4",
      },
      {
        preview: Partner05,
        id: "5",
      },
      {
        preview: Partner06,
        id: "6",
      },
    ],
  };

  render() {
    let partnersRender = null;

    if (this.state.partners) {
      partnersRender = this.state.partners.map((partner) => (
        <div key={partner.id}>
          <PartnerBox partner={partner.preview} />
        </div>
      ));
    }

    const params = {
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      breakpoints: {
        1200: {
          slidesPerView: 6,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
    };
    return <Swiper {...params}>{partnersRender}</Swiper>;
  }
}
export default MutipleSlidesPerView;
