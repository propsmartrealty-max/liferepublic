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
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:pointer-events-none rounded-2xl";

    const variants = {
        primary: "bg-gray-900 text-white shadow-sm hover:bg-gray-800 hover:shadow-md",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "bg-transparent text-gray-900 border border-gray-200 hover:border-gray-900 hover:bg-gray-50",
        ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        glass: "bg-white/70 text-gray-900 backdrop-blur-xl border border-white/50 shadow-sm hover:bg-white/90"
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11 rounded-full border border-gray-200"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
