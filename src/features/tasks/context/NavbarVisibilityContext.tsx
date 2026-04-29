/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { Position } from "./navbar-visibility.types";

const defaultPosition: Position = {
  navIsVisible: false,
  setNavIsVisible: () => {},
};

export const NavbarVisibilityContext =  createContext<Position>(defaultPosition);

export const NavbarVisibilityProvider = ({ children }: { children: React.ReactNode }) => {


  const [navIsVisible, setNavIsVisible] = useState(false);

  return (
    <NavbarVisibilityContext.Provider value={{  navIsVisible, setNavIsVisible }}>
      {children}
    </NavbarVisibilityContext.Provider>
  );
};

export function usePositionStore() {
  return useContext(NavbarVisibilityContext);
};
