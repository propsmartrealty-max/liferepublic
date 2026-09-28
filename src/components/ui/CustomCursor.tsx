import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.closest('.cursor-interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    // Antigravity cursor hides the default cursor. We need to hide it globally in CSS later.
    return (
        <motion.div 
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
            style={{ 
                x: smoothX, 
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%'
            }}
        >
            <motion.div 
                className="flex items-center gap-2 bg-white border border-[#DADCE0] text-[#202124] shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-full overflow-hidden"
                initial={{ width: 12, height: 12, borderRadius: '50%' }}
                animate={{ 
                    width: isHovering ? 'auto' : 16, 
                    height: isHovering ? 40 : 16,
                    padding: isHovering ? '0 16px' : '0'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                {isHovering && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 whitespace-nowrap"
                    >
                        <span className="text-xs font-medium font-sans">Explore</span>
                        <span className="material-symbol text-base">arrow_forward</span>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};
