import React, { useState, useEffect } from 'react';

export function useDebounce<T>(
    initialValue: T,
    delay: number,
    onChange ? : () => void
): {value : T, debouncedValue : T, setValue : React.Dispatch<React.SetStateAction<T>>} {
    const [value, setValue] = useState<T>(initialValue);
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            if (onChange) onChange();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return {value, debouncedValue, setValue};
}