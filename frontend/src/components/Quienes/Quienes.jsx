import React from "react";
import { Row, Col } from "react-flexbox-grid";
import { useTranslation } from "../../contexts/LanguageContext";
import "./Quienes.scss";
// Components
import TeamBox from "./teamBox";
import TeamInfo from "./teamInfo";
import Title from "../ui-components/title/title";
// Assets
import Person01 from "../../assets/Quienes/person01.jpg";
import Person02 from "../../assets/Quienes/person02.jpg";

const Quienes = () => {
  const { t } = useTranslation();

  return (
    <div id="Quienes">
      <div className="wrapper">
        <Title title={t('quienes.title')} />
        <p className="font12">
          {t('quienes.intro')}
          <br /><br />
          {t('quienes.closing')}
        </p>
        <Row>
          <Col md={12} lg={4}>
            <TeamBox
              avatar={Person01}
              name={t('quienes.boxes.seed')}
            />
          </Col>
          <Col md={12} lg={4}>
            <TeamBox
              avatar={Person02}
              name={t('quienes.boxes.growth')}
            />
          </Col>
          <Col md={12} lg={4}>
            <TeamInfo />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Quienes;