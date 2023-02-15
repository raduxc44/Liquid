import {createContext, useState, useEffect} from 'react';
import { Item } from '../data/types';

interface selectedFilterContextProps {
    selectedFilter: Item[] | [];
    setSelectedFilter: React.Dispatch<React.SetStateAction<Item[] | []>>;
}

export const SelectedFilterContext = createContext<selectedFilterContextProps>({
    selectedFilter: [],
    setSelectedFilter : () => {},
});

export const SelectedFilterProvider = ({children}: any) => {
    const [selectedFilter, setSelectedFilter] = useState<Item[]>([]);

    useEffect(() => {
        if (selectedFilter.length > 0) {
            sessionStorage.setItem("selectedFilter", JSON.stringify(selectedFilter));
        }
    }, [selectedFilter]);
    
    useEffect(() => {
        const storedSelectedFilter = JSON.parse(sessionStorage.getItem("selectedFilter") || "null");
        if (storedSelectedFilter) {
        setSelectedFilter(storedSelectedFilter);
        }
    }, [setSelectedFilter]);

    return (
        <SelectedFilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            {children}
        </SelectedFilterContext.Provider>
    );
};