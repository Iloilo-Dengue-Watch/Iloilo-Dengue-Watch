import React, { createContext, useState, useContext } from 'react';

const CsrfTokenContext = createContext();

export const useCsrfToken = () => useContext(CsrfTokenContext);

export const CsrfTokenProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');

  return (
    <CsrfTokenContext.Provider value={{ csrfToken, setCsrfToken }}>
      {children}
    </CsrfTokenContext.Provider>
  );
};