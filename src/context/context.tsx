import React, { createContext, useState } from "react";
import { initialUserInfo, User } from "../mock/types";

export const UserContext = createContext<{ userInfo: User; updateUser: (data: User) => void }>({
  userInfo: initialUserInfo,
  updateUser: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState({...initialUserInfo});

  const updateUser = (data: User) => setUserInfo({...data});

  return (
    <UserContext.Provider value={{ userInfo, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};