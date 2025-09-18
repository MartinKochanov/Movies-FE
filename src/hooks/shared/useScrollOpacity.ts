import { useState, useEffect } from "react";

interface UseScrollOpacityOptions {
  scrollThreshold?: number;
  maxOpacity?: number;
}

export const useScrollOpacity = ({ 
  scrollThreshold = 300, 
  maxOpacity = 1 
}: UseScrollOpacityOptions = {}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(scrollY / scrollThreshold, maxOpacity);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, maxOpacity]);

  return opacity;
};
