export const useKeyboardNavigation = (elementRefs) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'Tab':
          // Handle tab navigation
          break;
        case 'Enter':
          // Handle enter key
          break;
        case 'Escape':
          // Handle escape key
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [elementRefs]);
};