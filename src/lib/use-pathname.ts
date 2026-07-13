'use client';

import { useState, useEffect } from 'react';

export function usePathname() {
    const [pathname, setPathname] = useState('/');

    useEffect(() => {
        setPathname(window.location.pathname);

        const handlePopState = () => setPathname(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return pathname;
}
