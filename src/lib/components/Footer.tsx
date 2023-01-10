import { FC } from 'react';
import useTranslations from '../hooks/useTranslations';

type FooterProps = {
  appLanguage: string;
};

const Footer: FC<FooterProps> = ({ appLanguage }) => {
  const T = useTranslations(appLanguage);
  const date = new Date().getFullYear();

  return (
    <footer className="bg-primary text-typography h-1/12 flex items-center justify-center">
      <span>{T.compontents.footer.text}</span>
      <span className="px-2">{date}</span>
    </footer>
  );
};

export default Footer;
