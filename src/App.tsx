import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import IndividualProdPage from './pages/individualProdPage';
import { Item } from './data/types';
import { SelectedProdContext } from './Contexts/selectedProductContext';
import { SelectedFilterContext } from './Contexts/selectedFilterContext';
import FilteredProducts from './pages/filteredProductsPage';

function App() {

  const [selectedProductToShow, setSelectedProductToShow] = useState<Item | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Item[] | []>([]);
  const [quantityValue, setQuantityValue] = useState<number>(1);
  

  return (
    <SelectedProdContext.Provider value={{
      selectedProductToShow, setSelectedProductToShow,
      quantityValue, setQuantityValue
    }}>
    <SelectedFilterContext.Provider value={{
      selectedFilter, setSelectedFilter
    }}>
      <BrowserRouter>
        <Routes>
            <Route index element= {<Home/>}></Route>
            <Route 
            path={`/product/:productId`} 
            element={<IndividualProdPage />} />
            <Route
            path={`category/:categoryId`}
            element={<FilteredProducts />}
            />
        </Routes>
      </BrowserRouter>
    </SelectedFilterContext.Provider>
    </SelectedProdContext.Provider>
    
  );  
}

export default App;
