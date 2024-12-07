export const VoiceInput = () => {
  const [transcript, setTranscript] = useState('');
  const recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    setTranscript(transcript);
  };

  return (
    <div className="voice-input">
      <button 
        onClick={() => recognition.start()}
        aria-label="Start voice input"
      >
        🎤
      </button>
      <p>{transcript}</p>
    </div>
  );
};
