import { useState, useRef, useCallback } from 'react';

function useHover<T extends HTMLElement>(): [(node?: T | null) => void, {x: number, y: number} ] {
    const [value, setValue] = useState({x: 0, y: 0});
    const ref = useRef<T>();
    const resetCoordinates = useCallback(() => {
        setTimeout(() => {
            setValue({ x: 0, y: 0 }) 
        }, 500);
    }, []);

    const handleMouseOver = useCallback((event: MouseEvent | TouchEvent) => {
        if(ref.current) {
            const globalX = ('touches' in event ? event.touches[0].clientX : event.clientX);
            const globalY = ('touches' in event ? event.touches[0].clientY : event.clientY);

            const bounds = ref.current.getBoundingClientRect();
            const centerX = (bounds.left + bounds.right) / 2;
            const centerY = (bounds.top + bounds.bottom) / 2;
            const x = globalX - centerX;
            const y = (globalY - centerY) * -1;
        
            setValue({ x, y })
        }
    }, []);

    const callbackRef = useCallback<(node?: null | T) => void>(node => {
        if (ref.current) {
            ref.current.removeEventListener('mousemove', handleMouseOver);
            ref.current.removeEventListener('mouseleave', resetCoordinates);
            ref.current.removeEventListener('touchmove', handleMouseOver);        }

        ref.current = node || undefined;

        if (ref.current) {
            ref.current.addEventListener('mousemove', handleMouseOver);
            ref.current.addEventListener('mouseleave', resetCoordinates);
        }
    }, [handleMouseOver, resetCoordinates]);

    return [
        callbackRef, 
        value
    ]
}

export default useHover;