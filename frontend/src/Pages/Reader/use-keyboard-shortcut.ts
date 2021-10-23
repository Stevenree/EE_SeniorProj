
// https://www.fullstacklabs.co/blog/keyboard-shortcuts-with-react-hooks

import { useEffect, useCallback, useReducer } from "react";

const blacklistedTargets = ["INPUT", "TEXTAREA"];

// ???
const keysReducer = (state:any, action:any) => {
    switch (action.type) {
        case "set-key-down":
            const keydownState = { ...state, [action.key]: true };
            return keydownState;
        case "set-key-up":
            const keyUpState = { ...state, [action.key]: false };
            return keyUpState;
        case "reset-keys":
            const resetState = { ...action.data };
            return resetState;
        default:
            return state;
    }
};

const useKeyboardShortcut = (shortcutKeys:string[], callback:any) => {
    
    if (!callback || typeof callback !== "function")  
        throw new Error(    
            "The second parameter to `useKeyboardShortcut` must be a function that will be invoked when the keys are pressed."  
        );
    
    if (!Array.isArray(shortcutKeys))
        throw new Error(      
            "The first parameter to `useKeyboardShortcut` must be an ordered array of `KeyboardEvent.key` strings."    
        ); 
    if (!shortcutKeys.length)  
        throw new Error(    
            "The first parameter to `useKeyboardShortcut` must contain at least one `KeyboardEvent.key` string."  
        );

    const initalKeyMapping = shortcutKeys.reduce((currentKeys:any={}, key) =>{  
        currentKeys[key] = false;  
        return currentKeys;}, {}
    );
        
    const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping);

    // define our listeners
    // sets key down
    const keydownListener = useCallback(keydownEvent => {    
        const { key, target, repeat } = keydownEvent;    
        if (repeat) return;    
        if (blacklistedTargets.includes(target.tagName)) return;
        if (!shortcutKeys.includes(key)) return;    
        if (!keys[key]) setKeys({ type: "set-key-down", key });  
        },  [shortcutKeys, keys]
    );
    
    // sets key up
    const keyupListener = useCallback(    keyupEvent => {    
        const { key, target } = keyupEvent;    
        if (blacklistedTargets.includes(target.tagName)) return;    
        if (!shortcutKeys.includes(key)) return;    
        if (keys[key])            setKeys({ type: "set-key-up", key });  
        }, [shortcutKeys, keys]
    );

    // when reader unmounts it will remove these listeners so the keyboard shortcuts dont affect the rest of the application. 
    // Look up what useEffect is doing.
    useEffect(() => {  
        window.addEventListener("keydown", keydownListener, true);  
        return () => window.removeEventListener("keydown", keydownListener, true);}, [keydownListener]);

    useEffect(() => {  
        window.addEventListener("keyup", keyupListener, true);  
        return () => window.removeEventListener("keyup", keyupListener, true);
    }, [keyupListener]);

    useEffect(() => {  
        // Flips all values.
        // if something was True, it gets set to false. we filter based on if !value is true, so we get the total count of trues. If non zero we do the callback function.
        // ==> Why not just Object.values(keys).filter(value -> value) ??
        if (!Object.values(keys).filter(value => !value).length) callback(keys)}, [callback, keys])      

    return 0
};

export default useKeyboardShortcut;