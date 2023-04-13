import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import useTranslations from '../../../hooks/useTranslations';
import {
  AutoDetectedLanguage,
  Language,
  LanguageCode,
  SelectedLanguages,
  TranslatedText,
} from '../Language';
import { useAutoDetect, useSupportedLanguages, useTranslate } from '../actions';
import Confidence from './Confidence';
import Input from './Input';
import SelectLanguage from './SelectLanguage';
import SwapLanguages from './SwapLanguages';

const TranslatorScreen = () => {
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
  const T = useTranslations();
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
  }, [debounceCallback, inputValue, selectedLanguage]);

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
    <main className="flex justify-center items-center bg-background flex-1">
      <form className="flex flex-col md:flex-row md:gap-10 ">
        <div className="w-56 sm:w-80">
          <SelectLanguage
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
                if (autoDetectedLanguage.language !== selectedLanguage.target) {
                  setSelectedLanguage({
                    ...selectedLanguage,
                    source: autoDetectedLanguage.language,
                  });
                } else {
                  setSelectedLanguage({
                    target: LanguageCode.English,
                    source: autoDetectedLanguage.language,
                  });
                }
              }
            }}
            inputValue={inputValue}
            autoDetectedLanguage={autoDetectedLanguage}
            selectedLanguage={selectedLanguage}
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
        <div className="w-56 sm:w-80">
          <SelectLanguage
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
    </main>
  );
};

export default TranslatorScreen;
