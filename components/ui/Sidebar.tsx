import { useContext } from 'react';
import { UIContext } from '../../context/UIContext';
import {Drawer,Box,Typography, List, ListItem, ListItemText, ListItemIcon,ListItemButton} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const menu:string[] = ['Home','About','Contact'];

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer
      anchor={'left'}
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{width:250}}>
      <Box sx={{padding:'5px 10px'}}>
        <Typography variant='h6'> MENU</Typography>
        <List>
        {menu.map((text, index) => (
          <ListItem key={text} button>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

        </Box>
      </Box>
    </Drawer>
    
  ) 
}
