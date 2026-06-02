import React from 'react';

type ButtonComponentProps = {
  onButtonClick: () => void;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onButtonClick }) => {
  return (
    <button
      className='bg-secondary hover:bg-tertiary text-white py-2 px-4 rounded-md'
      onClick={onButtonClick}
    >
      Click me
    </button>
  );
};

export default ButtonComponent;
