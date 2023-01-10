import { FC } from 'react';

type InputProps = {
  inputValue: string | undefined;
  // eslint-disable-next-line react/require-default-props
  setInputValue?: (e: string) => void;
  isLoading: boolean;
  // eslint-disable-next-line react/require-default-props
  hasError?: boolean;
};

const Input: FC<InputProps> = ({
  inputValue,
  setInputValue,
  isLoading,
  hasError,
}) => {
  return (
    <div>
      <textarea
        style={{
          borderColor: `${hasError ? 'var(--error)' : 'var(--)'}`,
        }}
        onChange={(e) => {
          if (setInputValue) {
            setInputValue(e.target.value);
          }
        }}
        value={inputValue}
        className="p-2 h-52 w-80 resize-none border-2"
      />
      <div className="h-2">
        {isLoading && <div className="bg-primary h-1 animate-loading" />}
      </div>
    </div>
  );
};

export default Input;
