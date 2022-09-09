import { AppBar,Toolbar,IconButton,Typography, Link } from "@mui/material"
import { FC, useContext } from "react"
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import {UIContext} from '../../context/UIContext';

import NextLink from 'next/link';



export const Navbar:FC = () => {

  const { openSideMenu } = useContext(UIContext)


  return (
    <AppBar position='sticky'> 
      <Toolbar>
        <IconButton
          onClick={openSideMenu}
        >
          <MenuSharpIcon 
          /> 
        </IconButton>
        <NextLink href={'/'} passHref>
          <Link underline='none' color={'white'}>
            <Typography variant='h6'> OPEN GIRA</Typography> 
          </Link>
        </NextLink>
      </Toolbar> 
    </AppBar>
  )
}
