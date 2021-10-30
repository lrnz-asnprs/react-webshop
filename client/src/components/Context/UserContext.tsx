import React, { createContext, useState, useContext } from 'react';

const initialUserState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  loggedin: false
};

const useMyState = () => useState(initialUserState);

const UserContext = createContext<ReturnType<typeof useMyState> | null>(null);

export const useSharedUserState = () => {
  const value = useContext(UserContext);
  if (value === null) throw new Error('Please add SharedUserStateProvider');
  return value;
};

export const SharedUserStateProvider: React.FC = ({ children }) => (
  <UserContext.Provider value={useMyState()}>{children}</UserContext.Provider>
);
