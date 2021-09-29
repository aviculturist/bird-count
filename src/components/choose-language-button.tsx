import { Badge, IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

function ChooseLanguageButton() {
  const handleChooseLanguage = (event: React.MouseEvent<HTMLElement>) => {
    console.log('click');
  };

  return (
    <IconButton onClick={handleChooseLanguage} color="inherit">
      <Tooltip title="Choose Language">
        <LanguageIcon fontSize="small" />
      </Tooltip>
    </IconButton>
  );
}
export default ChooseLanguageButton;
