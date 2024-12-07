import React, { useRef, useEffect } from 'react';

export const MathCanvas = ({ onDraw }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Canvas setup and drawing logic
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="border rounded-lg touch-none"
      width={500}
      height={300}
    />
  );
};
