import React, { useState, useEffect } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDarkModeContext } from "@components/darkmode-context";

function ToggleDarkMode(): JSX.Element | null {
  const [mount, setMount] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkModeContext();

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <button type="button" onClick={toggleDarkMode} className={darkMode === true ? "dark" : "light"}>
      {darkMode === true ? <Brightness4Icon /> : <Brightness7Icon />}
      <style jsx>{`
        button {
          /* remove default */
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          /* custom styles */
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          padding: 4px;
          border-radius: 2px;
        }
        .light {
          color: #f6e05e;
        }
        .dark {
          color: #2d3748;
        }
      `}</style>
    </button>
  );
}

export default ToggleDarkMode;
