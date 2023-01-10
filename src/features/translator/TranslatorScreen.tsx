import { FC, useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useTranslations from '../../lib/hooks/useTranslations';
import SelectLangue from './SelectLangue';
import Loading from './Loading';
import Error from './Error';

import {
  LanguageCode,
  Language,
  SelectedLanguages,
  AutoDetectedLanguage,
  TranslatedText,
} from './Language';
import Confidence from './Confidence';
import Input from './Input';
import SwapLanguages from './SwapLanguages';
import { useAutoDetect, useSupportedLanguages, useTranslate } from './actions';

type TranslatorProps = {
  appLanguage: string;
};

const TranslatorScreen: FC<TranslatorProps> = ({ appLanguage }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [autoDetectedLanguage, setAutoDetectedLanguage] =
    useState<AutoDetectedLanguage>({
      confidence: 0,
      language: LanguageCode.English,
    });
  const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguages>({
    source: LanguageCode.Auto,
    target: LanguageCode.English,
  });
  const [translatedText, setTranslatedText] = useState<TranslatedText>({
    translatedText: '',
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

  const {
    fetchData: getTranslatedLanguage,
    isLoading: isTranslatingLanguage,
    hasError: hasErrorTranslatingLanguage,
  } = useTranslate(setTranslatedText);

  useEffect(() => {
    getSupportedLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceCallback = useDebouncedCallback(() => {
    if (selectedLanguage.source === LanguageCode.Auto) {
      getAutoDetectLanguage({
        q: inputValue,
      });
    }
    getTranslatedLanguage({
      q: inputValue,
      source: selectedLanguage.source,
      target: selectedLanguage.target,
      format: 'text',
    });
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
      <div className="flex h-full justify-center items-center">
        <form className="flex flex-col h-max sm:flex-row sm:gap-10 ">
          <div>
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
              onClick={() => {
                if (!hasErrorDetectingLanguage) {
                  setSelectedLanguage({
                    ...selectedLanguage,
                    source: autoDetectedLanguage.language,
                  });
                }
              }}
              inputValue={inputValue}
              autoDetectedLanguage={autoDetectedLanguage}
              hasError={
                hasErrorDetectingLanguage &&
                selectedLanguage.source === LanguageCode.Auto
              }
            />
          </div>
          <SwapLanguages
            onClick={() => {
              if (selectedLanguage.source !== LanguageCode.Auto) {
                setSelectedLanguage((prevState) => ({
                  target: prevState.source,
                  source: prevState.target,
                }));
                setTranslatedText({ translatedText: inputValue });
                setInputValue(translatedText.translatedText);
              }
            }}
          />
          <div>
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
            <Input
              inputValue={translatedText?.translatedText}
              isLoading={isTranslatingLanguage}
              hasError={hasErrorTranslatingLanguage}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default TranslatorScreen;
