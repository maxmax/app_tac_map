import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import TextField from '@mui/material/TextField';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
} from '../../Form';

export function EditForm() {
  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 15 },
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            component="div"
            sx={{
              '& .MuiTextField-root': { m: 1, mt: 15, width: '28ch' },
            }}
          >
            <TextField
              error
              id="outlined-error"
              label="Error"
              defaultValue="Hello World"
            />
            <TextField
              error
              id="outlined-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
            />
          </Box>
          <Box
            component="div"
            sx={{
              '& .MuiTextField-root': { m: 1, mt: 15, width: '100%' },
            }}
          >
            <TextField label="Outlined secondary" color="secondary" focused />
            <TextField label="Filled success" variant="filled" color="success" focused />
            <TextField fullWidth label="fullWidth" id="fullWidth" />
          </Box>
          <Box
            component="div"
            sx={{ mt: 5, pb: 15 }}
            // noValidate
            // autoComplete="off"
          >
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
              <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
            </FormGroup>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EditForm;
