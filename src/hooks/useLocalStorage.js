import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue, username) => {
    const userSpecificKey = `${username}-${key}`;
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(userSpecificKey);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Storage error:', error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(userSpecificKey, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [userSpecificKey, storedValue]);

    return [storedValue, setStoredValue];
};

export default useLocalStorage;
