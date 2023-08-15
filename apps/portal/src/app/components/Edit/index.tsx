import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EditForm from './EditForm';

export function Edit() {
  return (
    <>
      <Container maxWidth="sm">
        <EditForm />
      </Container>
    </>
  );
}

export default Edit;
