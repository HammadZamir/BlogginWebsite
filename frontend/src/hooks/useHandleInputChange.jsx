import { useState } from 'react';

const useHandleInputChange = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return [state, handleInputChange, setState];
};

export default useHandleInputChange;