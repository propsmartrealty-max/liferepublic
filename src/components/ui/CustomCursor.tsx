import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const DesktopCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.closest('.cursor-interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
            style={{
                x: cursorX,
                y: cursorY,
            }}
        >
            <motion.div 
                className="w-full h-full bg-white rounded-full flex items-center justify-center"
                animate={{
                    scale: isHovering ? 2.5 : 0.5,
                    opacity: isHovering ? 0.8 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </motion.div>
    );
};

export const CustomCursor = () => {
    const [isTouch, setIsTouch] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches) {
            setIsTouch(false);
        }
    }, []);

    if (isTouch) return null;
    return <DesktopCursor />;
};
