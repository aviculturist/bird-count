import * as React from 'react';
import { useAtom } from 'jotai';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import { styled } from '@mui/material/styles';
import { settingsMenuAnchorElAtom, settingsMenuAtom } from '@store/settings-menu';
import ClearApplicationDataMenuItem from '@components/clear-application-data-menuitem';
import { t } from '@lingui/macro';

// used for the localStorage import
const Input = styled('input')({
  display: 'none',
});

function SettingsMenu() {
  const [isOpen, setIsOpen] = useAtom(settingsMenuAtom);
  const [anchorEl, setAnchorEl] = useAtom(settingsMenuAnchorElAtom);

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const onClick = () => {
    //
  };

  const downloadFile = ({
    data,
    fileName,
    fileType,
  }: {
    data: any;
    fileName: string;
    fileType: string;
  }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(localStorage),
      fileName: 'users.json',
      fileType: 'text/json',
    });
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
        <MenuItem onClick={exportToJson}>
          <ListItemIcon>
            <IconButton size="small" color="primary">
              <DownloadOutlinedIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText inset={false}>Export localStorage</ListItemText>
        </MenuItem>
        <Tooltip title={t`Coming soon!`}>
          <label htmlFor="icon-button-file">
            <Input accept="application/json" id="icon-button-file" type="file" />
            <MenuItem disabled onClick={onClick}>
              <ListItemIcon>
                <IconButton
                  size="small"
                  color="primary"
                  aria-label="import localStorage"
                  component="span"
                >
                  <FileUploadOutlinedIcon fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <ListItemText inset={false}>Import localStorage</ListItemText>
            </MenuItem>
          </label>
        </Tooltip>
        <ClearApplicationDataMenuItem />
      </MenuList>
    </Menu>
  );
}
//SettingsMenu.whyDidYouRender = true
//export { SettingsMenu };

function SettingButton() {
  const [isOpen, setIsOpen] = useAtom(settingsMenuAtom);
  const [, setAnchorEl] = useAtom(settingsMenuAnchorElAtom);
  const handleChooseSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  return (
    <div>
      <IconButton
        size="small"
        onClick={handleChooseSetting}
        color="primary"
        id="settings-button"
        aria-controls="settings-menu"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
      >
        <Tooltip title={t`Settings`}>
          <PrivacyTipOutlinedIcon fontSize="small" />
        </Tooltip>
      </IconButton>
      <SettingsMenu />
    </div>
  );
}
export default SettingButton;
