import { FC, ReactNode, useReducer } from "react";
import { UIContext, UiReducer } from "./";

interface Props { 
  children: ReactNode
}

export interface UIState{
  sidemenuOpen : boolean;
  isAddingEntry : boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE : UIState = {
  sidemenuOpen : false ,
  isAddingEntry : false ,
  isDragging: false,

}


export const UiProvider:FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer( UiReducer , UI_INITIAL_STATE)

  const openSideMenu = () =>{
    dispatch({type:'UI - open sidebar'})
  }
  const closeSideMenu = () =>{
    dispatch({type:'UI - close sidebar'})
  }

  const setIsAddingEntry = () =>{
    dispatch({type:'UI - setIsAddingEntry'})
  }

  const startDragging = () =>{
    dispatch({type:'UI - start dragging'})
  }

  const endDragging = () =>{
    dispatch({type:'UI - end dragging'})
  }


  return (
    <UIContext.Provider value={{
      ...state,
      // Methods
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      startDragging,
      endDragging,
    }}>
      {children}
    </UIContext.Provider>
  )
}
