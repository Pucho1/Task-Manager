/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { Position } from "./navbar-visibility.types";

const defaultPosition: Position = {
  x: 0,
  y: 0,
  navIsVisible: false,
  setNavIsVisible: () => {},
  setPosition: () => {},
};

export const PositionContext =  createContext<Position>(defaultPosition);

export const PositionProvider = ({ children }: { children: React.ReactNode }) => {

  const [position, setPosition] = useState({ x: window.scrollX, y: window.scrollY });

  const [navIsVisible, setNavIsVisible] = useState(false);

  

  return (
    <PositionContext.Provider value={{ ...position, navIsVisible, setNavIsVisible, setPosition }}>
      {children}
    </PositionContext.Provider>
  );
};

export function usePositionStore() {
  return useContext(PositionContext);
};
