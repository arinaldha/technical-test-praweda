import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const isClient = typeof window === 'object';

    const [windowSize, setWindowSize] = useState({
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isClient]);

    return windowSize;
};

export const useIsMobile = (breakpoint: number = 768) => {
    const { width } = useWindowSize();
    return width !== undefined ? width < breakpoint : false;
};