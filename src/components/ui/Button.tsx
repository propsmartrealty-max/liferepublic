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
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wider transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:pointer-events-none rounded-none";

    const variants = {
        primary: "bg-primary text-white border-2 border-primary shadow-hard hover:bg-white hover:text-primary hover:shadow-hard-hover",
        secondary: "bg-background text-primary border-2 border-primary shadow-hard hover:bg-primary hover:text-white hover:shadow-hard-hover",
        outline: "bg-transparent text-primary border-2 border-primary shadow-hard hover:bg-primary hover:text-white hover:shadow-hard-hover",
        ghost: "text-primary hover:bg-primary hover:text-white border-2 border-transparent hover:border-primary",
        glass: "bg-surface text-primary border-2 border-primary shadow-hard hover:shadow-hard-hover"
    };

    const sizes = {
        sm: "h-9 px-5 text-[11px] uppercase tracking-[0.2em]",
        md: "h-12 px-8 text-xs uppercase tracking-[0.25em]",
        lg: "h-14 px-10 text-sm uppercase tracking-[0.3em]",
        icon: "h-12 w-12 rounded-none border-2 border-primary"
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
