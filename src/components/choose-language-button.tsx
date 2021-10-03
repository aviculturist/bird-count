import React, { useMemo } from 'react';

import { Badge, IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
// can't use next/app router until i18n SSG is supported
//import Link from 'next/link';
import { Link } from 'react-router-dom';

import { userLocaleAtom, DEFAULT_LOCALE, SUPPORTED_LOCALES, Locale } from '@store/user-locale';
import { useActiveLocale, navigatorLocale } from '@hooks/use-active-locale';

import { useAtom } from 'jotai';
import { languageMenuAnchorElAtom, languageMenuAtom } from '@store/language-menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// can't use next/app router until i18n SSG is supported
//import { useRouter } from 'next/router';
import { useLocation } from 'react-router-dom';
import { useLocationLinkProps } from '@hooks/use-location-link-props';

const CODE_TO_NAME: { [char: string]: string } = {
  en: 'English',
  it: 'Italiano',
  ru: 'Русский',
};

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
      {SUPPORTED_LOCALES.map(locale => (
        <LanguageMenuItem locale={locale} active={activeLocale === locale} key={locale} />
      ))}
      {/* When next supports i18n with SSG asPath would be preferred here */}
    </Menu>
  );
}
//LanguageMenu.whyDidYouRender = true
//export { LanguageMenu };

const useTargetLocale = (activeLocale: Locale) => {
  const browserLocale = useMemo(() => navigatorLocale(), []);

  if (browserLocale && (browserLocale !== DEFAULT_LOCALE || activeLocale !== DEFAULT_LOCALE)) {
    if (activeLocale === browserLocale) {
      return DEFAULT_LOCALE;
    } else {
      return browserLocale;
    }
  }
  return null;
};

function LanguageMenuItem({ locale, active }: { locale: Locale; active: boolean }) {
  const { to, onClick } = useLocationLinkProps(locale);

  if (!to) return null;

  return (
    <MenuItem key={locale} onClick={onClick} >
      <Link to={to}>
        {CODE_TO_NAME[locale]} {active && 'Active'}
      </Link>
    </MenuItem>
  );
}

function ChooseLanguageButton() {
  const [isOpen, setIsOpen] = useAtom(languageMenuAtom);
  const [,setAnchorEl] = useAtom(languageMenuAnchorElAtom);
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
