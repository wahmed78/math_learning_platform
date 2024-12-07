export const ProgressRing = ({ progress, size = 100 }) => {
  const circumference = size * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        stroke="currentColor"
        strokeWidth="8"
        fill="transparent"
        r={size / 2 - 4}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset,
          transition: 'stroke-dashoffset 0.5s ease'
        }}
      />
    </svg>
  );
};
