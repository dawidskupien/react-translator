import { FC, useMemo } from 'react';
import { Language, LanguageCode } from '../Language';

type SelectLangaugeProps = {
  languages: Array<Language>;
  onChange(newCode: LanguageCode): void;
  selectedLanguage: LanguageCode;
  exclude: Array<LanguageCode>;
};

const SelectLanguage: FC<SelectLangaugeProps> = ({
  languages,
  onChange,
  selectedLanguage,
  exclude,
}) => {
  const filteredLanguages = useMemo(
    () => languages.filter((language) => !exclude.includes(language.code)),
    [languages, exclude]
  );

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onChange(e.target.value as LanguageCode)}
      className="flex p-1 w-3/4 my-2 bg-secondary text-typography font-semibold border-2"
    >
      {filteredLanguages.map((language) => (
        <option value={language.code} key={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
};

export default SelectLanguage;
