import { FC, useCallback } from 'react';
import APP_CONFIG from '../../../config';
import {
  AutoDetectedLanguage,
  LanguageCode,
  SelectedLanguages,
} from '../Language';

type ConfidenceProps = {
  inputValue: string;
  autoDetectedLanguage: AutoDetectedLanguage;
  selectedLanguage: SelectedLanguages;
  hasError: boolean;
  onClick: () => void;
};

const Confidence: FC<ConfidenceProps> = ({
  inputValue,
  autoDetectedLanguage,
  selectedLanguage,
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
    <div className="flex justify-between w-full font-semibold">
      {selectedLanguage.source === LanguageCode.Auto && (
        <span
          onClick={onClick}
          aria-hidden="true"
          style={{
            color: `${hasError ? 'var(--error)' : 'var(--typography)'}`,
          }}
          className="w-2/3 cursor-pointer"
        >
          {getMessage()}
        </span>
      )}

      <span
        style={{
          color: `${
            inputValue.length > APP_CONFIG.MAX_INPUT_LENGTH
              ? 'var(--error)'
              : 'var(--typography)'
          }`,
        }}
        className="text-typography text-end w-full"
      >{`${inputValue.length}/${APP_CONFIG.MAX_INPUT_LENGTH}`}</span>
    </div>
  );
};

export default Confidence;
