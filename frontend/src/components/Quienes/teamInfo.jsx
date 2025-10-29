import React from "react";
import { useTranslation } from "../../contexts/LanguageContext";
// SCSS
import "./teamInfo.scss";

const TeamInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="team__info flex-center">
      <div>
        <h4 className="font20 weight800">{t('quienes.mission.title')}</h4>
        <p className="font12 weight500">
          {t('quienes.mission.description')}
        </p>
        <p className="font12 weight500">{t('quienes.mission.cta')}</p>
      </div>
    </div>
  );
};

export default TeamInfo;
