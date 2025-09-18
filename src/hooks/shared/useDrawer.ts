import { useState, useCallback } from "react";

export const useDrawer = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const toggleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    toggleDrawer,
    openDrawer,
    closeDrawer,
  };
};
