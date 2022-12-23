import { FC } from 'react';
import Images from '../../assets';
import useTranslations from '../hooks/useTranslations';

type IheaderProps = {
  setAppLanguage: (e: string) => void;
  appLanguage: string;
};

const Header: FC<IheaderProps> = ({ setAppLanguage, appLanguage }) => {
  const T = useTranslations(appLanguage);

  const selectHandler: IselectHandler = (e) => {
    setAppLanguage(e.target.value);
  };

  return (
    <header className="bg-primary px-5 flex justify-between items-center h-1/12">
      <div className="h-full flex items-center text-typography">
        <img className="h-full" src={Images.logo} alt="" />
        <h1>{T.compontents.header.title}</h1>
      </div>
      <div className="text-typography flex items-center gap-2">
        <span className="hidden sm:block">{T.compontents.header.select}</span>
        <select
          onChange={selectHandler}
          className="bg-background text-typography h-1/2"
        >
          <option value="US">US</option>
          <option value="PL">PL</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
