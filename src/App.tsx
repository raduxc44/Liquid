import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import IndividualProdPage from './pages/individualProdPage';
import { Item } from './data/types';
import { SelectedProdContext } from './Contexts/selectedProductContext';

function App() {

  const [selectedProductToShow, setSelectedProductToShow] = useState<Item | null>(null);
  const [quantityValue, setQuantityValue] = useState<number>(1);
  

  return (
    <SelectedProdContext.Provider value={{
      selectedProductToShow, setSelectedProductToShow,
      quantityValue, setQuantityValue
      }}>
      <BrowserRouter>
        <Routes>
            <Route index element= {<Home/>}></Route>
            <Route 
            path={`/product/:productId`} 
            element={<IndividualProdPage />} />
        </Routes>
      </BrowserRouter>
    </SelectedProdContext.Provider>

  );  
}

export default App;
