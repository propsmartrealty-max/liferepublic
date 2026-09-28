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
    const baseStyles = "inline-flex items-center justify-center font-sans font-light tracking-[0.2em] uppercase transition-all duration-700 focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-full backdrop-blur-xl";

    const variants = {
        primary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]",
        secondary: "bg-black/20 border border-white/10 text-white hover:bg-white/5",
        whatsapp: "bg-[#10B981]/20 text-white border border-[#10B981]/30 hover:bg-[#10B981]/40",
        outline: "bg-transparent text-white border border-white/20 hover:border-white/50",
        ghost: "text-white/50 hover:text-white hover:bg-white/5",
        glass: "bg-white/[0.03] text-white border border-white/[0.1] hover:bg-white/[0.08]"
    };

    const sizes = {
        sm: "h-10 px-6 text-[9px]",
        md: "h-12 px-8 text-[10px]",
        lg: "h-14 px-10 text-[11px]",
        icon: "h-12 w-12 border border-white/10 bg-white/[0.03]"
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
