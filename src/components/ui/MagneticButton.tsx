import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Smooth the motion values
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        // Calculate distance from center of button
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Move button slightly towards cursor (magnetic effect)
        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: springX, y: springY }}
            className={`cursor-interactive transition-colors ${className}`}
        >
            {children}
        </motion.button>
    );
};
