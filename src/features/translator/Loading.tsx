import { FC } from 'react';

type LoadingProps = {
  text: string;
};

const Loading: FC<LoadingProps> = ({ text }) => {
  return (
    <div className="bg-background h-10/12 flex flex-col items-center justify-center">
      <span className="text-typography text-xl">{text}</span>
      <div className="w-1/3">
        <div className="bg-primary h-1 animate-loading" />
      </div>
    </div>
  );
};

export default Loading;
