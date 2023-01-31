import useTranslations from '../hooks/useTranslations';

const Footer = () => {
  const T = useTranslations();
  const date = new Date().getFullYear();

  return (
    <footer className="bg-primary w-full text-[white] h-16 flex items-center justify-center">
      <span>&copy; {T.compontents.footer.text}</span>
      <span className="px-2">{date}</span>
    </footer>
  );
};

export default Footer;
