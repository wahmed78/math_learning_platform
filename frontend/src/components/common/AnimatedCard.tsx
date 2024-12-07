import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-lg shadow-md p-4"
  >
    {children}
  </motion.div>
);