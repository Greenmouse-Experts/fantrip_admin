import { useState } from "react";

export function useRoutine() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme:dark)").matches
  );
  console.log(isDark, 'yeah');
  
  return { isDark, setIsDark };
}
