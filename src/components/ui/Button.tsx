import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'whatsapp';
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
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-full";

    const variants = {
        primary: "bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
        secondary: "bg-surface border border-white/10 text-white hover:bg-white/10",
        whatsapp: "bg-primary text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
        outline: "bg-transparent text-white border border-white/20 hover:bg-white/5",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5",
        glass: "bg-white/5 text-white backdrop-blur-xl border border-white/10 hover:bg-white/10"
    };

    const sizes = {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
