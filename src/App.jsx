import { useRef, useState } from 'react'
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import WeddingCard from './WeddingCard';

const theme = createTheme({
  typography: {
    fontFamily: '"Dancing Script", cursive',
  },
});

function App() {

  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <WeddingCard />
        </ThemeProvider>
      </div>
    </>
  )
}

export default App
