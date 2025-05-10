import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';


const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: (theme.vars || theme).palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function ReviewsSection() {

  const content = [
    <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</p>,
    <p>{`“Joel and his wife are very welcoming and friendly. In the morning they offered us coffee and tea. The most peaceful and beautiful Airbnb!”`}</p>,
    <p>{`Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</p>,
    <p>{`Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}</p>,
    <p>{`Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}</p>,
  ];

  return (
    <Root>
      <Divider />
      <Chip label="469 reviews" size="small" />
      <Divider textAlign="left">
        <Chip avatar={<Avatar>S</Avatar>} label="Sama Mhmd" size="small" />
      </Divider>
      {content[1]}
      <Divider textAlign="left">
        <Chip avatar={<Avatar>N</Avatar>} label="Nada Hamdi" size="small" />
      </Divider>
      {content[1]}
    </Root>
  );
}
