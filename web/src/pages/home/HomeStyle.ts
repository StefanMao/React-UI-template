import { styled } from '@mui/system';
import { Grid, Typography } from '@mui/material';

export const Layout = styled(Grid)({
  minHeight: '100vh',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Description = styled(Typography)({
  fontSize: 18,
  color: '#666666',
  marginBottom: 4,
  textAlign: 'left',
})