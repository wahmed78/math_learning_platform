import { motion, useAnimation } from 'framer-motion';
import { useGesture } from '@use-gesture/react';

export const GestureControl = () => {
  const controls = useAnimation();
  
  const bind = useGesture({
    onDrag: ({ movement: [x, y] }) => {
      controls.start({ x, y });
    },
    onPinch: ({ scale }) => {
      controls.start({ scale });
    },
    onRotate: ({ angle }) => {
      controls.start({ rotate: angle });
    }
  });

  return (
    <motion.div
      {...bind()}
      animate={controls}
      className="gesture-container"
    />
  );
};
