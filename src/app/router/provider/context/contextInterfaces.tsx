export interface Position {
  x: number;
  y: number;
  navIsVisible: boolean;
  setNavIsVisible: (isVisible: boolean) => void;
  setPosition: (position: { x: number; y: number }) => void;
};