'use client';

import { createContext, useContext, useState } from 'react';

const DSPContext = createContext({
    isDSPMode: false,
    setIsDSPMode: () => { },
    titleRect: null,
    setTitleRect: () => { },
    triggerFrameReassign: () => { },
});

export function DSPProvider({ children }) {
    const [isDSPMode, setIsDSPMode] = useState(false);
    const [titleRect, setTitleRect] = useState(null);
    const [reassignTrigger, setReassignTrigger] = useState(0);

    const triggerFrameReassign = () => {
        setReassignTrigger(prev => prev + 1);
    };

    return (
        <DSPContext.Provider value={{ 
            isDSPMode, 
            setIsDSPMode, 
            titleRect, 
            setTitleRect,
            triggerFrameReassign,
            reassignTrigger 
        }}>
            {children}
        </DSPContext.Provider>
    );
}

export const useDSP = () => useContext(DSPContext);
