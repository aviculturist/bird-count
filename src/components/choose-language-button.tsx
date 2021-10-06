import React, { useMemo } from 'react';
import MenuList from '@mui/material/MenuList';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import LanguageIcon from '@mui/icons-material/Language';
// can't use next/app router until i18n SSG is supported
//import Link from 'next/link';
import { Link as ReactRouterDomLink, LinkProps } from 'react-router-dom';
import {
  userLocaleAtom,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  Locale,
  CODE_TO_NAME,
} from '@store/user-locale';
import { useActiveLocale, navigatorLocale } from '@hooks/use-active-locale';
import { useAtom } from 'jotai';
import { languageMenuAnchorElAtom, languageMenuAtom } from '@store/language-menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// can't use next/app router until i18n SSG is supported
//import { useRouter } from 'next/router';
// TODO: Currently missing any location information:
//import { useLocation } from 'react-router-dom';
import { useLocationLinkProps } from '@hooks/use-location-link-props';
//import LanguageLink from '@components/language-link';
import { styled } from '@mui/material/styles';
import { darken } from '@mui/material/styles';

const StyledLink = styled(ReactRouterDomLink)(
  ({ theme }) => `
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
`
);

function LanguageLink(props: LinkProps) {
  return <StyledLink {...props} />;
}

function LanguageMenu() {
  const [isOpen, setIsOpen] = useAtom(languageMenuAtom);
  const [userLocale, setUserLocale] = useAtom(userLocaleAtom);
  const [anchorEl, setAnchorEl] = useAtom(languageMenuAnchorElAtom);

  const activeLocale = useActiveLocale();
  //console.log('useActiveLocale reports locale from LanguageMenu: ' + activeLocale)

  const handleClick = (localeChoice: Locale) => {
    setUserLocale(localeChoice);
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <Menu
      id="language-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      keepMounted
      MenuListProps={{
        'aria-labelledby': 'choose-language-button',
      }}
    >
      <MenuList dense>
        {SUPPORTED_LOCALES.map(locale => (
          <LanguageMenuItem locale={locale} active={activeLocale === locale} key={locale} />
        ))}
        {/* When next supports i18n with SSG asPath would be preferred here */}
      </MenuList>
    </Menu>
  );
}
//LanguageMenu.whyDidYouRender = true
//export { LanguageMenu };

function LanguageMenuItem({ locale, active }: { locale: Locale; active: boolean }) {
  const { to, onClick } = useLocationLinkProps(locale);

  if (!to) return null;

  return (
    <MenuItem key={locale} onClick={onClick}>
      {active && (
        <ListItemIcon>
          <Check color="success" />
        </ListItemIcon>
      )}
      <LanguageLink to={to}>
        <ListItemText inset={!active}>{CODE_TO_NAME[locale]}</ListItemText>
      </LanguageLink>
    </MenuItem>
  );
}

function ChooseLanguageButton() {
  const [isOpen, setIsOpen] = useAtom(languageMenuAtom);
  const [, setAnchorEl] = useAtom(languageMenuAnchorElAtom);
  const handleChooseLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  return (
    <div>
      <IconButton
        onClick={handleChooseLanguage}
        color="inherit"
        id="choose-language-button"
        aria-controls="language-menu"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
      >
        <Tooltip title="Choose Language">
          <LanguageIcon fontSize="small" />
        </Tooltip>
      </IconButton>
      <LanguageMenu />
    </div>
  );
}
export default ChooseLanguageButton;
