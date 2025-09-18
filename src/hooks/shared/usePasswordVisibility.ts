import { useCallback, useState } from "react";

export const usePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return {
    visible,
    toggleVisibility,
  };
};
