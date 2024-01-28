import { styled } from '@mui/system';
import { Typography, Button } from '@mui/material';

export const AgeGroupPriceListContainer = styled('div')({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  border: '2px dashed grey',
  width: '70%',
  padding: 16,
  position: 'relative',
  height: '100%', 
});

export const AgeGroupInputContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: 170,
  position: 'relative',
  margin: '20px 0px',
});

export const PriceSettingTitle = styled(Typography)({
  textAlign: 'left',
  marginLeft: 8,
});

export const RemovePriceSettingButton = styled(Button)({
  position: 'absolute',
  top: 0,
  right: 0,
  marginTop: 8,
  marginRight: 8,
  color: '#f74343',
});

export const AddPriceSettingButton = styled(Button)({
  justifyContent: 'start',
  color: '#25b2ce',
  width: 120,
});
