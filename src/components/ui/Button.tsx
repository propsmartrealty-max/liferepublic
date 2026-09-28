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
    const baseStyles = "inline-flex items-center justify-center font-sans tracking-[0.2em] uppercase transition-all duration-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-none";

    const variants = {
        primary: "bg-primary text-black hover:bg-white hover:text-black",
        secondary: "bg-[#141414] border border-white/10 text-white hover:border-primary",
        whatsapp: "bg-[#10B981] text-white hover:bg-white hover:text-[#10B981]",
        outline: "bg-transparent text-white border border-white/30 hover:border-white",
        ghost: "text-white/50 hover:text-white hover:bg-white/5",
        glass: "bg-black/50 text-white backdrop-blur-md border border-white/10 hover:border-primary"
    };

    const sizes = {
        sm: "h-10 px-6 text-[9px]",
        md: "h-12 px-8 text-[10px]",
        lg: "h-14 px-10 text-[11px]",
        icon: "h-12 w-12 border border-white/10 bg-black/50 backdrop-blur-md"
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
