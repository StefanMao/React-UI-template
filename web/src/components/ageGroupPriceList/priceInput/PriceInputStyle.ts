import { styled } from '@mui/system';
import { TextField, Typography } from '@mui/material';

export const PriceInputContainer = styled('div')({
  padding: 8,
  width: '300px',
});

export const PriceInputTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    background: '#DDDDDD',
    '& fieldset': {
      borderColor: '#000000',
      opacity: 0.2,
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: '#000000',
      opacity: 0.2,
      borderWidth: 1,
    },
    '&.Mui-focused fieldset, &.Mui-error fieldset': {
      borderColor: '#000000',
      opacity: 0.1,
      borderWidth: 1.5,
    },
    input: {
      paddingLeft: 8,
      background: 'white',
    },
    '&.Mui-error input': {
      border: '1.5px solid #FF8988',
      borderRadius: '0 4px 4px 0',
    },
    '& .MuiInputAdornment-root': {
      '& .MuiTypography-root p': {
        opacity: 0.7,
      },
    },
  },
  '& .MuiFormHelperText-root.Mui-error': {
    backgroundColor: '#FFCCCC',
    borderRadius: 4,
    padding: '4px 8px',
    margin: 0,
    opacity: 0.8,
  },
});


export const FieldSmallDescription = styled(Typography)({
  fontSize: 12,
  color: '#666666',
});
