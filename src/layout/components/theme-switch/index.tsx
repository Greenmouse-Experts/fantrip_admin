import { useEffect } from "react";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
import { FaCloudMoon } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDaskMode"
  );
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, setIsDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }
  return (
    <div onClick={toggleDarkMode} className="cursor-pointer">
      {!isDarkMode ? <FiSun className="text-xl"/> : <FaCloudMoon className="text-xl text-white"/>}
    </div>
  );
};

export default ThemeSwitch;
