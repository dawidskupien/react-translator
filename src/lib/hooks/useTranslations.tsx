import { EN_US, PL_PL } from '../locale/Translations';

const useTranslations = (appLanguage: string) => {
  switch (appLanguage) {
    case 'US': {
      return EN_US;
    }
    case 'PL': {
      return PL_PL;
    }
    default: {
      return EN_US;
    }
  }
};
export default useTranslations;
