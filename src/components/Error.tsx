import { FC } from 'react';

type ErrorProps = {
  text: string;
  button_text?: string;
  onClick?(): void;
};

const Loading: FC<ErrorProps> = ({ text, button_text, onClick }) => {
  return (
    <div className="bg-background flex-1 flex flex-col items-center justify-center">
      <span className="text-error font-semibold text-xl">{text}</span>
      {button_text && onClick && (
        <button
          type="button"
          onClick={onClick}
          className="text-secondary bg-primary hover:opacity-80 border-2 p-2 my-2 rounded-lg cursor-pointer"
        >
          {button_text}
        </button>
      )}
    </div>
  );
};

Loading.defaultProps = {
  button_text: '',
  onClick: () => null,
};
export default Loading;
