import React from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import Link from 'next/link';
import { userLocaleAtom } from '@store/user-locale';
import { useAtom } from 'jotai';
import { languageMenuAnchorElAtom, languageMenuAtom } from '@store/language-menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';

const CODE_TO_NAME: { [char: string]: string } = {
  en: 'English',
  it: 'Italiano',
  ru: 'Русский',
};

export function LanguageMenu() {
  const { locale, locales, asPath } = useRouter();
  const [isOpen, setIsOpen] = useAtom(languageMenuAtom);
  const [userLocale, setUserLocale] = useAtom(userLocaleAtom);
  const [anchorEl, setAnchorEl] = useAtom(languageMenuAnchorElAtom);

  const handleClick = (localeChoice:string) => {
    setUserLocale(localeChoice);
    setAnchorEl(null);
    setIsOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
    // TODO: add to localStorage?
  };

  return (
    <Menu
      id="language-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      MenuListProps={{
        'aria-labelledby': 'choose-language-button',
      }}
    >
      {locales?.map((locale) => {
        return (
          <MenuItem key={locale} >
            <Link href={asPath} locale={locale}>
              <a href="#" onClick={() => handleClick(locale)}>{CODE_TO_NAME[locale]}</a>
            </Link>
          </MenuItem>
        );
      })}
    </Menu>
  );
}

function ChooseLanguageButton() {
  const [isOpen, setIsOpen] = useAtom(languageMenuAtom);
  const [anchorEl, setAnchorEl] = useAtom(languageMenuAnchorElAtom);
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
