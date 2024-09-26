import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue){

    const [storedvalue, setStoredvalue] = useState(()=>{
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue
    });

    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(storedvalue))
    }, [key, storedvalue]);
console.log(storedvalue)
    return [storedvalue, setStoredvalue]
    
}

export default useLocalStorage;