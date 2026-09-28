import React from 'react';
import { motion } from 'framer-motion';

export const MorphingBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
                animate={{
                    x: [0, 100, 0, -100, 0],
                    y: [0, -50, 50, 0, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-rainbow rounded-full mix-blend-multiply filter blur-[100px] opacity-20"
            />
            <motion.div
                animate={{
                    x: [0, -100, 50, 100, 0],
                    y: [0, 100, -50, 0, 0],
                    scale: [1, 1.5, 0.8, 1.2, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#E8F0FE] rounded-full mix-blend-multiply filter blur-[120px] opacity-40"
            />
        </div>
    );
};
