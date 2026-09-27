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
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wider transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:pointer-events-none rounded-full";

    const variants = {
        primary: "bg-accent/80 text-white backdrop-blur-xl border border-white/20 shadow-glass hover:bg-accent hover:shadow-glass-hover hover:-translate-y-1",
        secondary: "bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-glass hover:bg-white/20",
        outline: "bg-transparent text-white border border-white/30 backdrop-blur-sm hover:bg-white/10",
        ghost: "text-primary hover:bg-primary hover:text-white border-2 border-transparent hover:border-primary",
        glass: "bg-white/5 text-white backdrop-blur-2xl border border-white/10 shadow-glass hover:bg-white/10"
    };

    const sizes = {
        sm: "h-9 px-5 text-[11px] uppercase tracking-[0.2em]",
        md: "h-12 px-8 text-xs uppercase tracking-[0.25em]",
        lg: "h-14 px-10 text-sm uppercase tracking-[0.3em]",
        icon: "h-12 w-12 rounded-full border-2 border-primary"
    };

    return (
        <motion.button
            whileHover={{ x: -2, y: -2 }}
            whileTap={{ x: 0, y: 0 }}
            transition={{ duration: 0.1 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
