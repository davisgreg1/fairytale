import root from 'window-or-global';
import React, { useState } from 'react';

export const useActiveElement = () => {
  const [active, setActive] = useState(root?.document?.activeElement);

  const handleFocusIn = () => {
    setActive(root?.document?.activeElement);
  };

  React.useEffect(() => {
    root?.document?.addEventListener('focusin', handleFocusIn);
    return () => {
      root?.document?.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return active;
};