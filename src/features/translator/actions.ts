import {
  AutoDetectedLanguage,
  Language,
  LanguageCode,
  TranslatedText,
} from './Language';
import useFetch from '../../lib/hooks/useFetch';
import {
  AutoDetectedLanguageRequest,
  HttpMethod,
  TranslateTextRequest,
  TranslateTextResponse,
} from '../../lib/types/api';

export const useAutoDetect = (
  onSuccess: (languages: AutoDetectedLanguage) => void
) => {
  return useFetch<Array<AutoDetectedLanguage>, AutoDetectedLanguageRequest>(
    {
      url: 'detect',
      method: HttpMethod.POST,
    },
    {
      onSuccess: (autoDetectLanguage: Array<AutoDetectedLanguage>) =>
        onSuccess(autoDetectLanguage[0]),
    }
  );
};

export const useSupportedLanguages = (
  onSuccess: (languages: Array<Language>) => void
) => {
  return useFetch<Array<Language>>(
    {
      url: 'languages',
      method: HttpMethod.GET,
    },
    {
      onSuccess: (languages: Array<Language>) => {
        const allLanguages: Array<Language> = [
          {
            code: LanguageCode.Auto,
            name: 'Auto Detect',
          },
        ].concat(languages);
        onSuccess(allLanguages);
      },
    }
  );
};

export const useTranslate = (
  onSuccess: (translatedText: TranslatedText) => void
) =>
  useFetch<TranslateTextResponse, TranslateTextRequest>(
    {
      url: 'translate',
      method: HttpMethod.POST,
    },
    {
      onSuccess: (translatedText: TranslatedText) => onSuccess(translatedText),
    }
  );
