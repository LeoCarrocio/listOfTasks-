import {  UIState } from './'

type UIActionType =
| { type: 'UI - open sidebar' }
| { type: 'UI - close sidebar' }
| { type: 'UI - setIsAddingEntry' }
| { type: 'UI - start dragging' }
| { type: 'UI - end dragging' }


export const UiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - open sidebar':
      return { ...state, sidemenuOpen: true }
    
    case 'UI - close sidebar':
      return { ...state, sidemenuOpen: false }
    
    case 'UI - setIsAddingEntry':
      return { ...state, isAddingEntry: !state.isAddingEntry }
    
    case 'UI - start dragging':
      return { ...state, isDragging: true }
    
    case 'UI - end dragging':
      return { ...state, isDragging:false }
      
    default: return state
  }
}