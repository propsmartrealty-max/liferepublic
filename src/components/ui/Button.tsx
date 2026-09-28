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
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-[#1D1D1F] text-white hover:bg-[#000000] active:scale-95",
        secondary: "bg-[#E8E8ED] text-[#1D1D1F] hover:bg-[#D2D2D7] active:scale-95",
        whatsapp: "bg-[#34C759] text-white hover:bg-[#30B753] active:scale-95",
        outline: "bg-transparent text-[#0066CC] border border-[#0066CC] hover:bg-[#0066CC]/10",
        ghost: "text-[#0066CC] hover:bg-[#0066CC]/10",
        glass: "bg-[#F5F5F7]/80 backdrop-blur-md text-[#1D1D1F] border border-[#D2D2D7]/50 hover:bg-[#E8E8ED]"
    };

    const sizes = {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10"
    };

    return (
        <motion.button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
