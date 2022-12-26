import { FC, useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useTranslations from '../../lib/hooks/useTranslations';
import useSupportedLanguages from './useSupportedLanguages';
import SelectLangue from './SelectLangue';
import Loading from './Loading';
import Error from './Error';

import {
  LanguageCode,
  Language,
  SelectedLanguages,
  AutoDetectedLanguage,
} from './Language';
import Confidence from './Confidence';
import Input from './Input';
import SwapLanguages from './SwapLanguages';
import useAutoDetect from './useAutoDetect';

type TranslatorProps = {
  appLanguage: string;
};

const TranslatorScreen: FC<TranslatorProps> = ({ appLanguage }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<
    Array<AutoDetectedLanguage>
  >([{ confidence: 0, language: LanguageCode.English }]);
  const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguages>({
    source: LanguageCode.Auto,
    target: LanguageCode.English,
  });
  const T = useTranslations(appLanguage);
  const {
    fetchData: getSupportedLanguages,
    isLoading,
    hasError,
  } = useSupportedLanguages(setLanguages);
  const {
    fetchData: getAutoDetectLanguage,
    isLoading: isDetectingLanguage,
    hasError: hasErrorDetectingLanguage,
  } = useAutoDetect(setAutoDetectedLanguage);

  useEffect(() => {
    getSupportedLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceCallback = useDebouncedCallback(() => {
    if (selectedLanguage.source === LanguageCode.Auto) {
      getAutoDetectLanguage(inputValue);
    }
  }, 1000);

  useEffect(() => {
    if (inputValue.length > 1) {
      debounceCallback();
    }
  }, [debounceCallback, inputValue]);

  if (isLoading) {
    return <Loading text={T.compontents.translator.loading} />;
  }
  if (hasError) {
    return (
      <Error
        text={T.compontents.translator.error}
        button_text={T.compontents.translator.err_button}
        onClick={() => getSupportedLanguages}
      />
    );
  }
  if (languages.length === 0) {
    return <Error text={T.compontents.translator.no_langauges} />;
  }
  return (
    <main className="bg-background h-10/12 w-screen overflow-auto">
      <form className="flex flex-col w-full h-full justify-center items-center gap-2 sm:flex-row sm:gap-10 ">
        <div className="w-60 h-60">
          <SelectLangue
            languages={languages}
            exclude={[selectedLanguage.target]}
            onChange={(newCode) =>
              setSelectedLanguage((prevState) => ({
                ...prevState,
                source: newCode,
              }))
            }
            selectedLanguage={selectedLanguage.source}
          />
          <Input
            inputValue={inputValue}
            setInputValue={setInputValue}
            isLoading={isDetectingLanguage}
          />
          <Confidence
            inputValue={inputValue}
            autoDetectedLanguage={autoDetectedLanguage[0]}
            hasError={
              hasErrorDetectingLanguage &&
              selectedLanguage.source === LanguageCode.Auto
            }
          />
        </div>
        <SwapLanguages
          onClick={() => {
            if (selectedLanguage.source !== LanguageCode.Auto)
              setSelectedLanguage((prevState) => ({
                target: prevState.source,
                source: prevState.target,
              }));
          }}
        />
        <div className="h-60">
          <SelectLangue
            languages={languages}
            exclude={[selectedLanguage.source, LanguageCode.Auto]}
            onChange={(newCode) =>
              setSelectedLanguage((prevState) => ({
                ...prevState,
                target: newCode,
              }))
            }
            selectedLanguage={selectedLanguage.target}
          />
          <Input inputValue={inputValue} isLoading={isDetectingLanguage} />
        </div>
      </form>
    </main>
  );
};

export default TranslatorScreen;
