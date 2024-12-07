export const A11yProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    screenReader: false,
    keyboardNav: true,
    colorBlindMode: false,
    textToSpeech: false
  });

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <A11yContext.Provider value={{ settings, toggleSetting }}>
      <div 
        className={`
          ${settings.colorBlindMode ? 'color-blind-friendly' : ''}
          ${settings.screenReader ? 'screen-reader-mode' : ''}
        `}
      >
        {children}
      </div>
    </A11yContext.Provider>
  );
};
