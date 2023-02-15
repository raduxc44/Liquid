import {createContext, useState, useEffect} from 'react';
import { Item } from '../data/types';

interface selectedProdContextProps {
    selectedProductToShow: Item | null;
    setSelectedProductToShow: React.Dispatch<React.SetStateAction<Item | null>>;
    quantityValue: number;
    setQuantityValue: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectedProdContext = createContext<selectedProdContextProps>({
    selectedProductToShow: null,
    setSelectedProductToShow: () => {},
    quantityValue: 1,
    setQuantityValue: () => {}
});

export const SelectedProdProvider = ({children}: any) => {
    const [selectedProductToShow, setSelectedProductToShow] = useState<Item | null>(null);
    const [quantityValue, setQuantityValue] = useState<number>(1);

    useEffect(() => {
        if (selectedProductToShow) {
            sessionStorage.setItem("selectedProductToShow", JSON.stringify(selectedProductToShow));
        }
    }, [selectedProductToShow]);
    
    // Restore selectedProductToShow from sessionStorage when the component is first rendered
    useEffect(() => {
        const storedSelectedProductToShow = JSON.parse(sessionStorage.getItem("selectedProductToShow") || "[]");
        if (storedSelectedProductToShow) {
        setSelectedProductToShow(storedSelectedProductToShow);
        }
    }, [setSelectedProductToShow]);

    return (
        <SelectedProdContext.Provider value={{
            selectedProductToShow,
            setSelectedProductToShow,
            quantityValue,
            setQuantityValue
        }}>
            {children}
        </SelectedProdContext.Provider>
    );
};