import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: any) => {
    
    useEffect(() => {
        const handleClick = (e: any) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            callback();
        };
        
        document.addEventListener("mousedown", handleClick);
        
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [ref, callback])
};

export default useOutsideClick;
