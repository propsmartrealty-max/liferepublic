import React from 'react';
import { motion } from 'framer-motion';

export const KineticText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
    // Split text into characters, but preserve words to prevent awkward wrapping
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 40,
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "inherit" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {words.map((word, index) => (
                <span style={{ display: "inline-flex", overflow: "hidden" }} key={index} className="mr-[0.25em]">
                    {word.split("").map((char, index) => (
                        <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.div>
    );
};
