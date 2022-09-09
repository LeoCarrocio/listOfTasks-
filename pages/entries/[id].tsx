import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps  } from 'next'
import { Layouts } from '../../components/layouts';
import { capitalize , Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel,RadioGroup, Radio, FormControlLabel, IconButton} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {dbEntries} from '../../database';
import { Entry, EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/Entries';
import { dateFunction } from '../../utils';

const validStatus:EntryStatus[] = ['pending','in-progress','finished'];

interface EntriesPageProps{
  entry:Entry
} 


 export const EntriesPage:FC<EntriesPageProps> = ({entry}) => {

  const {updateEntry} = useContext(EntriesContext);

  const[inputValue, setInputValue] = useState(entry.description);
  const[status, setStatus] = useState<EntryStatus>(entry.status);
  const[touched, setTouched] = useState(false); 

  const isNotValid = useMemo(() => inputValue.length >= 0 && touched,[inputValue, touched]);

  const onTextFieldChanged = (event:ChangeEvent<HTMLInputElement>) =>{
    setInputValue(event.target.value);
  }

  const onStatusChanged = (event:ChangeEvent<HTMLInputElement>) =>{
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () =>{
    
    if(inputValue.trim.length === 0) return;

    const entryUpdate: Entry ={
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(entryUpdate,true);
  }



  return (
    <Layouts title={inputValue.substring(0,10) + ' ...'}>
      <Grid
        container
        justifyContent='center'
        sx={{marginTop:2}}
      >
        <Grid item xs={12} sm={8} md={6}>
          <CardHeader
            title={`Entry : ${inputValue}`}
            subheader={`Created to  ${dateFunction.getFormatDistanceToNow( entry.createdAt)}`}
          >
          </CardHeader>
          <CardContent>
            <TextField
              sx={{marginTop:2, marginBottom:1}}
              fullWidth
              autoFocus 
              multiline
              label='New Entry'
              value={ inputValue }
              onChange={ onTextFieldChanged }
              onBlur={() => setTouched(true)}
              error= { isNotValid && touched }
              helperText={ isNotValid && 'Enter a value'}
            />
            <FormControl>
              <FormLabel>Label</FormLabel>
              <RadioGroup
                row
                value={ status }
                onChange={ onStatusChanged }
              >
              {
                validStatus.map(option=>(
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio/>}
                    label={capitalize(option)}
                  />
                ))
                }
              </RadioGroup>

            </FormControl>

          </CardContent>
          <CardActions>
             <Button
              startIcon={<SaveIcon/>}  
              variant='contained'
              fullWidth
              onClick={ onSave }
              disabled={ inputValue.length <= 0 }
             >
              SAVE
             </Button>
          </CardActions>

        </Grid>
      </Grid>

      <IconButton sx={{ 
        position:'fixed',
        bottom:30,
        right:30,
        backgroundColor:'Error.dark',
        }}
      >
        <DeleteIcon/>
      </IconButton>



    </Layouts>
  ) 
}


// You should use getServerSideProps when:
//-Only if you need to pre-renderapage whose data must be fetched at request time
// esto hace q se genere la solicitud del lado del servidor y lo da pre cargado al front 

// esto corre del lado del servidor osea esta partre es del codigo del servidor



 
export const getServerSideProps:GetServerSideProps=async(ctx)=>{

  // el el ctx => tengo toda la info del ado del servidor 
  const { id } = ctx.params as { id: string }

  const entry = await dbEntries.getEntryById(id);

 
  if(!entry){
    // si no es valido el id es erronea q valla a la pgina destino de edicion, sino q vuelva a la del home
    return{
      redirect:{
        destination:'/', // destino
        permanent:false, // porque la pag sigue existiendo y le avisa a google q la teng en cuenta, si esta en true dice a google q jamas va a funcionar nuevamente 
      }
    }

  }

  //const{data} = await // your fetch function here
  return{
    props:{
      entry
    }
  }
}

export default EntriesPage;