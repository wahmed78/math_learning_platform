export const ResponsiveGrid = ({ children, minWidth = '250px' }) => (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
      }}
    >
      {children}
    </div>
  );
  