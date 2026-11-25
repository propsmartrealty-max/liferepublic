import { createContext } from 'react';

export interface SSRHeadData {
    title?: string;
    metas: Array<Record<string, string>>;
    links: Array<Record<string, string>>;
    schemas: string[];
    route?: string;
}

export const SSRHeadContext = createContext<SSRHeadData | null>(null);
