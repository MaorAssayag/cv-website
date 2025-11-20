'use client';

import { createContext, useContext, useState } from 'react';

const DSPContext = createContext({
    isDSPMode: false,
    setIsDSPMode: () => { },
    titleRect: null,
    setTitleRect: () => { },
});

export function DSPProvider({ children }) {
    const [isDSPMode, setIsDSPMode] = useState(false);
    const [titleRect, setTitleRect] = useState(null);

    return (
        <DSPContext.Provider value={{ isDSPMode, setIsDSPMode, titleRect, setTitleRect }}>
            {children}
        </DSPContext.Provider>
    );
}

export const useDSP = () => useContext(DSPContext);
