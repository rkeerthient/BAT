import { createContext, useContext, useState } from "react";
import * as React from "react";

interface MyContextType {
  noData: boolean;
  setNoData: React.Dispatch<React.SetStateAction<any>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

interface MyContextProviderProps {
  children: React.ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [noData, setNoData] = useState<boolean>(false);

  return (
    <MyContext.Provider
      value={{
        noData,
        setNoData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
