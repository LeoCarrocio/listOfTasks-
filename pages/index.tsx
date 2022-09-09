import type { NextPage } from 'next'
import { Layouts } from '../components/layouts'
import { Typography, Grid, Card, CardHeader,CardContent } from '@mui/material'
import { EntryList, NewEntry } from '../components/ui'



const Home: NextPage = () => {
  return (
    <Layouts title='HOME - OPEN JIRA '>
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title='Pendientes' />
            <CardContent>
              <NewEntry/>
              <EntryList status='pending'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title='En progreso' />
            <CardContent>
              <EntryList status='in-progress'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title='Finalizado' />
            <CardContent>
              <EntryList status='finished'/>
            </CardContent>
          </Card>
        </Grid>


      </Grid>

      
    </Layouts>
  )
}

export default Home
