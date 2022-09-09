import { useState, ChangeEvent, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {EntriesContext} from '../../context/Entries'
import {UIContext} from '../../context/UIContext'

export const NewEntry = () => {

  //const [isAdd, setIsAdd] = useState<boolean>(false)
  const { isAddingEntry , setIsAddingEntry } = useContext(UIContext)
  const [inputValue, setInputValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const { addNewEntry } = useContext(EntriesContext)

  const onTextFieldChange= (event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue(event.target.value);
  }
  
  const onSave = () =>{
    if(inputValue.length <= 0) return

    addNewEntry(inputValue)

    setIsAddingEntry()
    setInputValue('')
    setTouched(false)
  }

  return (
    <Box sx={{marginBottom: 1, paddingX:2}}>
    {
      isAddingEntry ? <>
        <TextField 
          fullWidth
          sx={{marginTop:2, marginBottom:1}}
          placeholder='Nueva entrada'
          multiline
          label='Nueva entrada'
          onChange={onTextFieldChange}
          value={inputValue}
          error={inputValue.length === 0 && touched}
          onBlur={()=>setTouched(true)}
          helperText={inputValue.length === 0 && touched && 'ingrese un valor'}
        />
        <Box display="flex" justifyContent='space-between'>
          <Button 
            variant='text'
            onClick={setIsAddingEntry}
            >
            Cancelar 
          </Button>
          <Button 
            variant='outlined'
            color='secondary'
            endIcon={<SaveIcon/>}
            onClick={onSave}
            >
            Guardar
          </Button>
        </Box>
      </> :
        <Button 
          variant='outlined'
          endIcon={!isAddingEntry && <AddCircleIcon/>}
          fullWidth
          onClick={setIsAddingEntry} 
          sx={{marginTop:2, marginBottom:1}}
          >
           Agregar tarea
        </Button>
    }
    </Box>
  )
}
