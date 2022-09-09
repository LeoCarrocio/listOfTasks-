import {FC, DragEvent, useContext} from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces'
import {UIContext} from '../../context/UIContext'
import { dateFunction } from '../../utils';


interface CardProp {
  entry: Entry;
}



export const EntryCard:FC<CardProp> = ({entry}) => {

  const {  startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();
 
  const onDragStart = (event:DragEvent) => {
    event.dataTransfer.setData("id", entry._id); // con esto cuando yo hago drag, automanticamente seteo un dato y le pongo el id q es unico 
    startDragging()// al context le aviso q estamos hacineod el draagg 
    // ahora tengo q cambiar el estado de la tarea dependiendo donde caiga, hacienod drag 

  }

  const onDragEndEntry = (event:DragEvent<HTMLDivElement>)=>{
    endDragging()// al context le aviso q estoy soltando 
  }

  const onRedirect = () => {
    router.push(`/entries/${entry._id}`);
  }

  return (
    <Card 
      sx={{marginBottom : 2}}
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEndEntry }
      onClick={ onRedirect }
    >
      <CardActionArea>
        <CardContent>
          <Typography 
            sx={{whiteSpace:'pre-line',}}
          >
            {entry.description}
          </Typography>
          

        </CardContent>
        <CardActions 
          sx={{ display:'flex', justifyContent:'end', paddingRight:2}}
        >
        <Typography 
            variant='body2'
          >
            {dateFunction.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
