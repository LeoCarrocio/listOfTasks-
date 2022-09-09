import { FC, useContext, useMemo, DragEvent } from "react"
import {UIContext} from '../../context/UIContext'
import { EntriesContext } from "../../context/Entries"
import { EntryCard } from "./EntryCard"
import { EntryStatus, Entry } from "../../interfaces"
import { List, Paper } from "@mui/material"
import style from "./EntryList.module.css";


interface PropsEntryList {
  status: EntryStatus
}

export const EntryList:FC<PropsEntryList> = ({status}) => {

   const { entries, updateEntry } = useContext(EntriesContext);
   const {isDragging, endDragging } = useContext(UIContext);
  
  //utilizo el useMemo para memorizar las entries que filtro, solo vuelve a memorizar cuando cambien leas entires  
  const entriesBody = useMemo(() => entries.filter(entry => entry.status === status),[entries])

  const onDragOverEntry = (event:DragEvent<HTMLDivElement>) =>{
    event.preventDefault();
    //console.log({event});
  }
  const onDropEntry = (event:DragEvent<HTMLDivElement>) =>{
    const ids = event.dataTransfer.getData("id");
    
    const entry = entries.find(e => e._id === ids)! ;
    entry.status = status;
    updateEntry(entry);
    endDragging()

  }
   
  return (
    // aqi se hara el drop down
    <div
      onDrop={onDropEntry}
      onDragOver={onDragOverEntry} 
      className={isDragging ? style.dragging : ''}
    > 
      <Paper sx={{height:'100vh', overflow:'scroll', backgroundColor:'transparent', padding:'3px 5px'}}>
        <List sx={{opacity: isDragging ? 0.3 : 1, transition:'all .3s'}}> 
          {
            entriesBody.map(entry => {
              return <EntryCard key={entry._id} entry = {entry} />
            })
          }
        </List>
      </Paper>
    </div>
  )
}
