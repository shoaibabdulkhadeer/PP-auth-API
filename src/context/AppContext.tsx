import React from "react";

export const AppContext = React.createContext<{
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  userInfo: any;
}>({
  userInfo: {},
  setUserInfo: () => {},
});
