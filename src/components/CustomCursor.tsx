import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) return;

        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const onMouseEnter = () => {
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            ring.style.width = '52px';
            ring.style.height = '52px';
            ring.style.opacity = '0.3';
        };

        const onMouseLeave = () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            ring.style.width = '36px';
            ring.style.height = '36px';
            ring.style.opacity = '0.5';
        };

        window.addEventListener('mousemove', onMouseMove);

        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        const animate = () => {
            const { x: mx, y: my } = mousePos.current;
            ringPos.current.x += (mx - ringPos.current.x) * 0.12;
            ringPos.current.y += (my - ringPos.current.y) * 0.12;

            cursor.style.left = `${mx}px`;
            cursor.style.top = `${my}px`;
            ring.style.left = `${ringPos.current.x}px`;
            ring.style.top = `${ringPos.current.y}px`;

            requestAnimationFrame(animate);
        };

        const requestID = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestID);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor" id="cursor" />
            <div ref={ringRef} className="cursor-ring" id="cursor-ring" />
        </>
    );
};
