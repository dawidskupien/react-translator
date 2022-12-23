export type SelectedLanguages = {
  source: LanguageCode;
  target: LanguageCode;
};

export type Language = {
  code: string;
  name: string;
};

export enum LanguageCode {
  Auto = 'auto',
  English = 'en',
  Chinese = 'zh',
  German = 'de',
  Polish = 'pl',
  Spanish = 'es',
}
