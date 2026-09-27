import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:pointer-events-none rounded-full";

    const variants = {
        primary: "bg-accent text-white shadow-[0_8px_30px_rgb(88,166,24,0.3)] hover:shadow-[0_15px_40px_rgb(88,166,24,0.5)] border border-transparent hover:border-white/20",
        secondary: "bg-secondary text-white shadow-xl hover:shadow-2xl",
        outline: "border border-accent text-accent hover:bg-accent hover:text-white backdrop-blur-md",
        ghost: "text-secondary hover:bg-gray-100 hover:text-accent",
        glass: "bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:bg-white/20"
    };

    const sizes = {
        sm: "h-9 px-5 text-[11px] uppercase tracking-[0.2em]",
        md: "h-12 px-8 text-xs uppercase tracking-[0.25em]",
        lg: "h-14 px-10 text-sm uppercase tracking-[0.3em]",
        icon: "h-12 w-12 rounded-full"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
