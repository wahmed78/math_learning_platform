import React from 'react';
import { motion, Reorder } from 'framer-motion';

export const DraggableProblem = ({ items, onReorder }) => (
  <Reorder.Group axis="y" values={items} onReorder={onReorder}>
    {items.map((item) => (
      <Reorder.Item key={item.id} value={item}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white p-4 rounded-lg shadow cursor-pointer"
        >
          {item.content}
        </motion.div>
      </Reorder.Item>
    ))}
  </Reorder.Group>
);
