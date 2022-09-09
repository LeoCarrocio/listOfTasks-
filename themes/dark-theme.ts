import { createTheme } from '@mui/material'
import { red} from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
      mode: 'dark',
      secondary: {
        main : '#18857b'
      },
      error: {
        main :red[400]
      },
    },
  
  components: {
    MuiAppBar: {
      defaultProps:{},
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c',
          elevation: 1,
        }
      }
    }
  }
});