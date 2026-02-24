import { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) return;

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const onMouseEnter = () => setIsHovered(true);
        const onMouseLeave = () => setIsHovered(false);

        window.addEventListener('mousemove', onMouseMove);
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        const animate = () => {
            setRingPos(prev => ({
                x: prev.x + (position.x - prev.x) * 0.15,
                y: prev.y + (position.y - prev.y) * 0.15
            }));
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, [position, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <div
                className="cursor-dot"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`,
                    opacity: isHovered ? 0.8 : 1
                }}
            />
            <div
                className="cursor-ring"
                style={{
                    left: ringPos.x,
                    top: ringPos.y,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.44 : 1})`,
                    opacity: isHovered ? 0.3 : 0.5
                }}
            />
        </>
    );
};
