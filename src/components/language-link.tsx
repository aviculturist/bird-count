import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {darken, useTheme} from '@mui/material/styles';

const StyledLink = styled(Link)(
  ({ theme = useTheme() }) => `
  color: ${theme.palette.primary.main};
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);

export default function LanguageLink(props) {
  return <StyledLink {...props} />;

}
// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: ${props => props.theme.colors.main};
//   &:focus,
//   &:hover,
//   &:visited,
//   &:link,
//   &:active {
//     text-decoration: none;
//   }
// `;
// ${props => props.inputColor
// function StyledLink(props) {
//   const theme = useTheme();
//   const StyledLink = styled(Link)`
//     text-decoration: none;
//     color: ${theme.palette.primary.main};
//     &:focus,
//     &:hover,
//     &:visited,
//     &:link,
//     &:active {
//       text-decoration: none;
//     }
//   `;
//   return <StyledLink {...props} />;
// }
// export default StyledLink;
// const StyledLink = styled(Link)`
//     text-decoration: none;
//     color: {theme.primary};
//     &:focus, &:hover, &:visited, &:link, &:active {
//         text-decoration: none;
//     }
// `;
// export default (props) => <StyledLink {...props} />;
