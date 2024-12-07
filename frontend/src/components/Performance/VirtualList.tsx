import React, { useRef, useEffect, useState } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualList<T>({
  items,
  itemHeight,
  renderItem
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });

  useEffect(() => {
    const updateVisibleRange = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, clientHeight } = containerRef.current;
      const start = Math.floor(scrollTop / itemHeight);
      const end = Math.min(
        start + Math.ceil(clientHeight / itemHeight),
        items.length
      );
      
      setVisibleRange({ start, end });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateVisibleRange);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateVisibleRange);
      }
    };
  }, [items.length, itemHeight]);

  const totalHeight = items.length * itemHeight;
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', overflow: 'auto' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: visibleRange.start * itemHeight,
            width: '100%'
          }}
        >
          {visibleItems.map((item, index) =>
            renderItem(item, index + visibleRange.start)
          )}
        </div>
      </div>
    </div>
  );
}