export const AccessibilityControls = () => {
    const { 
      highContrast, 
      setHighContrast,
      fontSize,
      setFontSize,
      reducedMotion
    } = useAccessibility();
  
    return (
      <div role="group" aria-label="Accessibility Controls">
        <button
          onClick={() => setHighContrast(!highContrast)}
          aria-pressed={highContrast}
        >
          High Contrast Mode
        </button>
        <div className="font-size-controls">
          <button onClick={() => setFontSize(f => f - 2)}>A-</button>
          <button onClick={() => setFontSize(f => f + 2)}>A+</button>
        </div>
      </div>
    );
  };
  