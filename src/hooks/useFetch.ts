import { useState } from 'react';
import APP_CONFIG from '../config/index';
import { HttpMethod, OnError, OnSuccess } from '../types/api';

type FetchProps = {
  url: string;
  method: HttpMethod;
};

type FetchActions<Response> = {
  onSuccess: OnSuccess<Response>;
  onError?: OnError;
};

const useFetch = <Response, Request = object>(
  config: FetchProps,
  actions: FetchActions<Response>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return {
    isLoading,
    hasError,
    fetchData: (params?: Request) => {
      setIsLoading(true);
      setHasError(false);

      const fetchConfig = {
        method: config.method,
        ...(config.method === HttpMethod.POST && {
          body: JSON.stringify({
            ...params,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      };

      fetch(`${APP_CONFIG.API_URL}/${config.url}`, fetchConfig)
        .then((res) => {
          if (res.ok) {
            return res;
          }
          const err = new Error();
          throw err;
        })
        .then((res) => res.json())
        .then(actions.onSuccess)
        .catch(() => {
          setHasError(true);
          if (actions.onError) {
            actions.onError();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };
};

export default useFetch;
