import {createContext} from 'react';
import { Item } from '../data/types';

interface selectedFilterContextProps {
    selectedFilter: Item[] | [];
    setSelectedFilter: React.Dispatch<React.SetStateAction<Item[] | []>>;
}

export const SelectedFilterContext = createContext<selectedFilterContextProps>({
    selectedFilter: [],
    setSelectedFilter: () => {},
});