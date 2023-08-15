import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider } from 'mobx-react';
import { stores } from './stores/root-store';

import AppMap from './containers/AppMap';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          padding: 0;
          margin: 0;
          width: 100%;
        }
      `,
    }
  }
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider { ...stores }>
        <Router>
          <Routes>
            <Route path="/" element={<AppMap/>}/>
            <Route path="/systems/:id" element={<AppMap/>}/>
            <Route path="/systems/:id/terrains/:id" element={<AppMap/>}/>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
