import { FC, useCallback } from 'react';
import { AutoDetectedLanguage, LanguageCode } from './Language';
import APP_CONFIG from '../../lib/config';

type IConfidenceProps = {
  inputValue: string;
  autoDetectedLanguage: AutoDetectedLanguage;
  hasError: boolean;
};

const Confidence: FC<IConfidenceProps> = ({
  inputValue,
  autoDetectedLanguage,
  hasError,
}) => {
  const toPercentage = (n: number): string => {
    const t = n * 100;
    return `${t.toFixed()}% `;
  };
  const getFullLanguageName = useCallback(() => {
    if (!autoDetectedLanguage) {
      return undefined;
    }
    const [fullLanguageName] =
      Object.entries(LanguageCode).find(
        ([, languageCode]) => languageCode === autoDetectedLanguage.language
      ) || [];
    return fullLanguageName;
  }, [autoDetectedLanguage]);

  const getMessage = useCallback(() => {
    if (hasError) {
      return `Sorry we couldn't detect the language`;
    }
    if (!autoDetectedLanguage) {
      return '';
    }

    return `(${toPercentage(
      autoDetectedLanguage.confidence
    )} ${getFullLanguageName()})`;
  }, [autoDetectedLanguage, getFullLanguageName, hasError]);

  return (
    <div className="flex justify-between w-full">
      <span
        style={{
          color: `${hasError ? 'var(--error)' : 'var(--typography)'}`,
        }}
        className="text-typography text-sm cursor-pointer"
      >
        {getMessage()}
      </span>

      <span
        style={{
          color: `${
            inputValue.length > APP_CONFIG.MAX_INPUT_LENGTH
              ? 'var(--error)'
              : 'var(--typography)'
          }`,
        }}
        className="text-typography text-sm"
      >{`${inputValue.length}/${APP_CONFIG.MAX_INPUT_LENGTH}`}</span>
    </div>
  );
};

export default Confidence;
