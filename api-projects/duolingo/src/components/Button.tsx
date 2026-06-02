import React from 'react';

type ButtonProps = {
  onButtonClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ onButtonClick }) => {
  return <button onClick={onButtonClick}>click here</button>;
};

export default Button;
