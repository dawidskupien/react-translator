import { useState } from 'react';
import APP_CONFIG from '../../lib/config';
import { AutoDetectedLanguage } from './Language';

const useAutoDetect = (
  onSucces: (languages: Array<AutoDetectedLanguage>) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return {
    isLoading,
    hasError,
    fetchData: (query: string) => {
      setIsLoading(true);
      setHasError(false);

      fetch(`${APP_CONFIG.API_URL}/detect`, {
        method: 'POST',
        body: JSON.stringify({
          q: query,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res;
          }
          const err = new Error();
          throw err;
        })
        .then((res) => res.json())
        .then((autoDetectedLanguage) => {
          onSucces([autoDetectedLanguage]);
        })
        .catch((err) => {
          setHasError(true);
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };
};

export default useAutoDetect;
