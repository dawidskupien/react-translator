import Images from '../assets';
import useTranslations from '../hooks/useTranslations';

const Header = () => {
  const T = useTranslations();

  return (
    <header className="bg-primary px-5 flex justify-between items-center h-20">
      <div className="h-full flex items-center text-[white] font-semibold">
        <img className="h-full" src={Images.logo} alt="" />
        <h1 className="text-xl ">{T.compontents.header.title}</h1>
      </div>
    </header>
  );
};

export default Header;
