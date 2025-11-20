'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const moveCursor = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        };

        document.addEventListener('mousemove', moveCursor);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            if (cursor && cursor.parentNode === document.body) {
                document.body.removeChild(cursor);
            }
        };
    }, []);

    return null;
}
