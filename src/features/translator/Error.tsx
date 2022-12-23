import { FC } from 'react';

type ErrorProps = {
  text: string;
  button_text?: string;
  onClick?(): void;
};

const Loading: FC<ErrorProps> = ({ text, button_text, onClick }) => {
  return (
    <div className="bg-background h-10/12 flex flex-col items-center justify-center">
      <span className="text-error text-xl">{text}</span>
      {button_text && onClick && (
        <button
          type="button"
          onClick={onClick}
          className="text-typography hover:bg-primary text-l border-2 p-1 m-2 rounded-xl cursor-pointer"
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
