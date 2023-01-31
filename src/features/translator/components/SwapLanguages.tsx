import { FC } from 'react';
import Images from '../../../assets';

type SwapLanguagesProps = {
  onClick: () => void;
};

const SwapLanguages: FC<SwapLanguagesProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center cursor-default"
    >
      <img className="h-12 cursor-pointer" src={Images.arrows} alt="" />
    </button>
  );
};

export default SwapLanguages;
