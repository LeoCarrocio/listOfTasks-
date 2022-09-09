import {createContext} from 'react'; 

interface ContexProps{
  sidemenuOpen: boolean;
  isAddingEntry : boolean;
  isDragging : boolean;


  // methods
  openSideMenu : ()=> void;
  closeSideMenu : ()=> void;
  setIsAddingEntry :() => void;
  startDragging :() => void;
  endDragging :()=> void;


}

export const UIContext = createContext( {} as ContexProps ); 