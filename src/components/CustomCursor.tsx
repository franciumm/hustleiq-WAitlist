import { useEffect, useState } from 'react';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) return;

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [isVisible]);

    return (
        <div
            className="custom-cursor"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                opacity: isVisible ? 1 : 0,
            }}
        />
    );
};
