import { styled } from '@mui/system';
import { Box, Select } from '@mui/material';

export const AgeGroupSelectContainer = styled('div')({
  border: '1px solid red',
  padding: 8,
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
});

export const AgeSelect = styled(Select)({
  textAlign: 'left',
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
