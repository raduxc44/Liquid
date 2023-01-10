import {createContext} from 'react';
import { Item } from '../data/types';

interface selectedProdContextProps {
    selectedProductToShow: Item | null;
    setSelectedProductToShow: React.Dispatch<React.SetStateAction<Item | null>>;
}

export const SelectedProdContext = createContext<selectedProdContextProps>({
    selectedProductToShow: null,
    setSelectedProductToShow: () => {}
});