import React, { useState, useEffect } from 'react';

export default function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(animate);
    }, [end]);

    return <span>{count}</span>;
}