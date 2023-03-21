import {createContext} from 'react';

type appearenceMethodsContextType = {
    showElement: (element: HTMLElement, animationClass:string) => void;
    hideElement: (element: HTMLElement, animationClass:string) => void;
}

export const AppearenceMethodsContext = createContext<appearenceMethodsContextType>({
    showElement: () => {},
    hideElement: () => {},
});

export const AppearenceMethodsProvider = ({children}: any) => {
    const showElement = (element: HTMLElement, animationClass:string) => {
        if(!element.classList.contains('in-transition')) {
            element.classList.toggle('in-transition')
            element.style.display = 'flex';
            element.classList.toggle(animationClass)
            setTimeout(() => {
                element.classList.toggle(animationClass)
                element.classList.toggle('in-transition')
            }, 1000)
        }
    }
    const hideElement = (element: HTMLElement, animationClass:string) => {
        if(!element.classList.contains('in-transition')) {
            element.classList.toggle('in-transition')
            element.classList.toggle(animationClass)
            setTimeout(() => {
                element.classList.toggle('in-transition')
                element.classList.toggle(animationClass)
                element.style.removeProperty('display')
            }, 1000)
        }
    }

    return (
        <AppearenceMethodsContext.Provider value={{showElement, hideElement}}>
            {children}
        </AppearenceMethodsContext.Provider>
    )
}