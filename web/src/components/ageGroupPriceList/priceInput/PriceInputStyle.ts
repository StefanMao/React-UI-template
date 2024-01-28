import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const PriceInputContainer = styled('div')({
  padding: 8,
  width: '300px',
});

export const PriceInputTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    background: '#DDDDDD',
    height: 42,
    '&.Mui-focused fieldset': {
      borderColor: '#adacac',
      opacity: 0.3,
      borderWidth: 1,
    },
     '&.Mui-error fieldset': {
      borderColor: '#adacac',
      opacity: 0.3,
      borderWidth: 1,
    },
    input: {
      paddingLeft: 8,
      background: 'white',
      borderRight: '0.5px solid #adacac',
      borderRadius: '0 4px 4px 0',
    },
    '&.Mui-error input': {
      border: '1px solid #FF0000',
    },
    '& .MuiInputAdornment-root': {
      '& .MuiTypography-root p': {
        opacity: 0.7,
      },
    },
  },
  '& .MuiFormHelperText-root.Mui-error': {
    background: '#ffe6e6',
    color: '#f74343',
    fontWeight: 'bold',
    borderRadius: 4,
    padding: 4,
    margin: 0,
    opacity: 0.8,
  },
});
