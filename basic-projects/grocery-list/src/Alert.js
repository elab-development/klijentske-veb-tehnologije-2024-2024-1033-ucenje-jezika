// react imports
import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [list, removeAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
