import { FC } from 'react';

type InputProps = {
  inputValue: string;
  // eslint-disable-next-line react/require-default-props
  setInputValue?: (e: string) => void;
  isLoading: boolean;
};

const Input: FC<InputProps> = ({ inputValue, setInputValue, isLoading }) => {
  return (
    <div>
      <textarea
        onChange={(e) => {
          if (setInputValue) {
            setInputValue(e.target.value);
          }
        }}
        value={inputValue}
        className="p-2 h-40 w-60 resize-none"
      />
      <div className="h-2">
        {isLoading && <div className="bg-primary h-1 animate-loading" />}
      </div>
    </div>
  );
};

export default Input;
