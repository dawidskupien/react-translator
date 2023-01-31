import { LanguageCode } from '../features/translator/Language';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}
export type OnError = () => void;
export type OnSuccess<Response> = (response: Response) => void;

export type AutoDetectedLanguageRequest = {
  q: string;
};

export type TranslateTextRequest = {
  q: string;
  source: LanguageCode;
  target: LanguageCode;
  format: string;
};

export type TranslateTextResponse = {
  translatedText: string;
};
