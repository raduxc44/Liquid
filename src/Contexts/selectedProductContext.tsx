import {createContext} from 'react';
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