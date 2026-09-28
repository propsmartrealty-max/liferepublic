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
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none rounded-lg uppercase text-xs";

    const variants = {
        primary: "bg-[#7F1D1D] text-white hover:bg-[#991B1B] shadow-md border border-red-900/50",
        secondary: "bg-transparent border border-white/20 text-[#E5C07B] hover:bg-white/5",
        whatsapp: "bg-[#10B981] text-white hover:bg-[#059669] shadow-md",
        outline: "bg-transparent text-white border border-white/20 hover:border-[#E5C07B] hover:text-[#E5C07B]",
        ghost: "text-gray-300 hover:text-white hover:bg-white/10",
        glass: "bg-[#151822]/80 text-white backdrop-blur-xl border border-white/10 hover:border-white/30"
    };

    const sizes = {
        sm: "h-8 px-4 text-[10px]",
        md: "h-10 px-6 text-[11px]",
        lg: "h-12 px-8 text-xs",
        icon: "h-10 w-10 rounded-full border border-white/20"
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
