import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface AutoLinkerProps {
    text: string;
    className?: string;
}

// Global dictionary mapping highly searched keywords to our deep pSEO location silos
const KEYWORD_MAP: Record<string, string> = {
    "hinjewadi": "/location/flats-near-hinjewadi",
    "wakad": "/location/flats-near-wakad",
    "punawale": "/location/flats-near-punawale",
    "tathawade": "/location/flats-near-tathawade",
    "marunji": "/location/flats-near-marunji",
    "2 bhk": "/2-bhk-flats-in-hinjewadi",
    "3 bhk": "/3-bhk-flats-in-hinjewadi",
    "4 bhk": "/4-bhk-flats-in-hinjewadi",
    "row houses": "/row-houses-in-life-republic",
    "luxury villas": "/luxury-villas-near-hinjewadi",
    "plots": "/plots-in-hinjewadi",
    "nri investment": "/nri-investment-guide",
    "it professionals": "/it-professionals-hinjewadi"
};

export const AutoLinker: React.FC<AutoLinkerProps> = ({ text, className = "" }) => {
    const processText = useMemo(() => {
        if (!text) return [];

        let currentText = text;
        const result: (string | JSX.Element)[] = [];
        
        // Build a regex pattern from our keywords (longest first to prevent partial matches)
        const keywords = Object.keys(KEYWORD_MAP).sort((a, b) => b.length - a.length);
        const pattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');

        let lastIndex = 0;
        let match;

        while ((match = pattern.exec(text)) !== null) {
            // Push text before the match
            if (match.index > lastIndex) {
                result.push(text.substring(lastIndex, match.index));
            }

            const matchedWord = match[0];
            const lowerMatch = matchedWord.toLowerCase();
            const url = KEYWORD_MAP[lowerMatch];

            // Push the hyperlinked word
            result.push(
                <Link 
                    key={match.index} 
                    to={url} 
                    className="text-[#E5C07B] hover:text-white underline decoration-[#E5C07B]/30 hover:decoration-white transition-colors font-semibold"
                    title={`Explore ${matchedWord} properties`}
                >
                    {matchedWord}
                </Link>
            );

            lastIndex = pattern.lastIndex;
        }

        // Push remaining text
        if (lastIndex < text.length) {
            result.push(text.substring(lastIndex));
        }

        return result;
    }, [text]);

    return (
        <span className={className}>
            {processText.map((item, index) => (
                <React.Fragment key={index}>{item}</React.Fragment>
            ))}
        </span>
    );
};
