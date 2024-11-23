import { useState, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

export default function OptimizedImage({ src, alt, width, height, className }: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const imageElement = document.querySelector(`img[data-src="${src}"]`);
        if (imageElement) {
            observer.observe(imageElement);
        }

        return () => observer.disconnect();
    }, [src]);

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            )}
            <img
                data-src={src}
                src={isInView ? src : ''}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            />
        </div>
    );
} 