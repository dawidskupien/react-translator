import { FC, useCallback } from 'react';
import { AutoDetectedLanguage, LanguageCode } from './Language';
import APP_CONFIG from '../../lib/config';

type ConfidenceProps = {
  inputValue: string;
  autoDetectedLanguage: AutoDetectedLanguage;
  hasError: boolean;
  onClick: () => void;
};

const Confidence: FC<ConfidenceProps> = ({
  inputValue,
  autoDetectedLanguage,
  hasError,
  onClick,
}) => {
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
    return `(${autoDetectedLanguage.confidence}% ${getFullLanguageName()})`;
  }, [autoDetectedLanguage, getFullLanguageName, hasError]);
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-between w-full"
    >
      <span
        style={{
          color: `${hasError ? 'var(--error)' : 'white'}`,
        }}
        className="text-typography cursor-pointer"
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
        className="text-typography"
      >{`${inputValue.length}/${APP_CONFIG.MAX_INPUT_LENGTH}`}</span>
    </button>
  );
};

export default Confidence;
