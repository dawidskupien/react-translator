import { useState } from 'react';
import APP_CONFIG from '../../lib/config';
import { Language } from './Language';

const useSupportedLanguages = (
  onSucces: (languages: Array<Language>) => void,
  autoDetect: Language
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return {
    isLoading,
    hasError,
    fetchData: () => {
      setIsLoading(true);
      setHasError(false);

      fetch(`${APP_CONFIG.API_URL}/languages`)
        .then((res) => {
          if (res.ok) {
            return res;
          }
          const err = new Error();
          throw err;
        })
        .then((res) => res.json())
        .then((languages) => {
          const allLanguages: Array<Language> = [autoDetect].concat(languages);
          onSucces(allLanguages);
        })
        .catch((err) => {
          setHasError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };
};

export default useSupportedLanguages;
