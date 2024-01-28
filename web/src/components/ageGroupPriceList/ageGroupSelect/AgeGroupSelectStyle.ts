import { styled } from '@mui/system';
import { Box, Select, FormHelperText } from '@mui/material';

export const AgeGroupSelectContainer = styled('div')({
  padding: 8,
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const AgeSelect = styled(Select)({
  textAlign: 'left',
  height: 42,
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #FF0000 !important',
  },
});

export const MiddleAdornment = styled(Box)({
  background: '#DDDDDD',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 28,
  opacity: 0.6,
  fontSize: 18,
});

export const ErrorHelperText = styled(FormHelperText)({
  background: '#ffe6e6',
  color: '#f74343',
  fontWeight: 'bold',
  padding: 4,
  borderRadius: 4,
  margin: 0,
  opacity: 0.8,
});
