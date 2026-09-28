import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
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
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2";

    const variants = {
        primary: "bg-[#1a73e8] text-white hover:bg-[#1557b0] shadow-sm",
        secondary: "bg-white border border-[#DADCE0] text-[#1a73e8] hover:bg-[#F8F9FA]",
        whatsapp: "bg-[#188038] text-white hover:bg-[#137333] shadow-sm",
        outline: "bg-transparent text-[#1a73e8] border border-[#1a73e8] hover:bg-[#1a73e8]/10",
        ghost: "text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`cursor-interactive ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
