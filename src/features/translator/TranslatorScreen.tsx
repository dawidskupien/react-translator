import { FC, useState, useEffect } from 'react';
import useTranslations from '../../lib/hooks/useTranslations';
import Images from '../../assets';
import useSupportedLanguages from './useSupportedLanguages';
import SelectLangue from './SelectLangue';
import Loading from './Loading';
import Error from './Error';
import { LanguageCode, Language, SelectedLanguages } from './Language';

type ItranslatorProps = {
  appLanguage: string;
};

const TranslatorScreen: FC<ItranslatorProps> = ({ appLanguage }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguages>({
    source: LanguageCode.Auto,
    target: LanguageCode.English,
  });
  const T = useTranslations(appLanguage);
  const autoDetect = {
    code: LanguageCode.Auto,
    name: `${T.compontents.translator.select}`,
  };
  const {
    fetchData: getSupportedLanguages,
    isLoading,
    hasError,
  } = useSupportedLanguages(setLanguages, autoDetect);

  useEffect(() => {
    getSupportedLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <main className="bg-background flex justify-center items-center h-10/12 h-min-fit overflow-auto">
      <form className="flex flex-col gap-2 sm:flex-row sm:gap-10 ">
        <div className="">
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
          <textarea
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="p-2 h-40 w-60 resize-none"
          />
          <div className="h-2">
            <div className="bg-primary h-1 animate-loading" />
          </div>
          <div className="flex justify-between">
            <span className="text-typography">(68%) polish</span>
            <span
              style={{
                color: `${
                  inputValue.length > 2000
                    ? 'var(--error)'
                    : 'var(--typography)'
                }`,
              }}
              className="text-typography"
            >{`${inputValue.length}/2000`}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (selectedLanguage.source !== LanguageCode.Auto)
              setSelectedLanguage((prevState) => ({
                target: prevState.source,
                source: prevState.target,
              }));
          }}
          className="flex items-center justify-center"
        >
          <img
            className="h-10 cursor-pointer invert"
            src={Images.arrows}
            alt=""
          />
        </button>
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
          <textarea
            value={inputValue}
            readOnly
            className="p-2 h-40 w-60 resize-none"
          />
          <div className="h-2">
            <div className="bg-primary h-1 animate-loading" />
          </div>
        </div>
      </form>
    </main>
  );
};

export default TranslatorScreen;
