import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import NotesApp from './Components/NotesApp';

const App = () => {
  return (
    <div>
      <AppBar position="static" sx={{bgcolor:'#b4b4b4', color:'black'}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center',fontWeight:'bold',fontSize:'50px'}}>
            Notes App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2, bgcolor: '#f4f4f4', minHeight: '10vh', padding: 2 }}>
        {/* <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          Your Notes
        </Typography> */}
        <NotesApp />
      </Container>
    </div>
  );
};

export default App;
